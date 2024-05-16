import Link from 'next/link';

const WelcomePage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Todo List!</h1>
            <p className="text-lg mb-8">Lets get organized and productive!</p>
            <Link href="todos" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {/* Use double quotes instead of single quotes */}
                &quot;Get Started&quot;
            </Link>
        </div>
    );
};

export default WelcomePage;
