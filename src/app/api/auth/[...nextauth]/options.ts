import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { openDb } from '@/lib/db'; 
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'admin@admin.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					console.error('Missing credentials');
					return null;
				}

				const db = await openDb();
				try {
					const user = await db.get(
						'SELECT id, username, password FROM users WHERE username = $1',
						[credentials.email],
					);

					if (user) {
						// Check if password is plaintext (direct compare) or hashed (bcrypt compare)
						let isValid = false;
						
						// First try direct comparison (for plaintext passwords during development)
						if (credentials.password === user.password) {
							isValid = true;
							console.log('Authenticated with plaintext password');
						} else {
							// Then try bcrypt comparison (for hashed passwords)
							try {
								isValid = await bcrypt.compare(
									credentials.password,
									user.password,
								);
								if (isValid) {
									console.log('Authenticated with hashed password');
								}
							} catch (error) {
								console.error('Error comparing passwords:', error);
							}
						}

						if (isValid) {
							console.log(`User authorized: ${user.username}`);
							return { id: user.id.toString(), name: user.username, email: user.username };
						}
						console.warn(`Invalid password for user: ${credentials.email}`);
						return null;
					}
					console.warn(`User not found: ${credentials.email}`);
					return null;
				} catch (error) {
					console.error('Error during authorization:', error);
					return null;
				} finally {
					await db.close();
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
		signOut: '/auth/login',
		error: '/auth/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development',

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user && token.id) {
				(session.user as any).id = token.id;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			// If the URL is relative, prepend the base URL
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			// If the URL is absolute but on the same site, allow it
			else if (new URL(url).origin === baseUrl) {
				return url;
			}
			// Otherwise, redirect to the dashboard
			return `${baseUrl}/dashboard`;
		},
	},
};