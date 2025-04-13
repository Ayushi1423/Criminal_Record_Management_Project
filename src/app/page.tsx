export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Criminal Record Management System
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Welcome to the Criminal Record Management System. This platform helps in managing and tracking criminal records efficiently.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Record Management</h2>
          <p className="text-gray-600">Efficiently manage and update criminal records</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Search & Analysis</h2>
          <p className="text-gray-600">Quick search and analysis of criminal records</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Secure Access</h2>
          <p className="text-gray-600">Secure and controlled access to sensitive information</p>
        </div>
      </div>
    </div>
  )
}
