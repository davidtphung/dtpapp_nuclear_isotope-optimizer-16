
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto px-4 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm font-medium text-nuclear-900 dark:text-nuclear-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Back to Home
            </Link>
          </div>
          
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <span className="font-medium">Presented by</span>{" "}
              <a href="https://x.com/davidtphung" target="_blank" rel="noopener noreferrer" className="text-nuclear-500 hover:text-nuclear-600 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                David T Phung
              </a>
            </p>
            <p>
              <span className="font-medium">Powered by:</span>{" "}
              <a href="https://davidtphung.com" target="_blank" rel="noopener noreferrer" className="text-nuclear-500 hover:text-nuclear-600 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                NLT143
              </a>{" "}
              |{" "}
              <a href="https://warpcast.com/davidtphung" target="_blank" rel="noopener noreferrer" className="text-nuclear-500 hover:text-nuclear-600 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                Warpcast
              </a>{" "}
              |{" "}
              <a href="https://www.youtube.com/playlist?list=PLqchICbseuRpn8PqBDDXwnpAp5MI-9-zN" target="_blank" rel="noopener noreferrer" className="text-nuclear-500 hover:text-nuclear-600 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                YouTube ☕️ Podcast
              </a>
            </p>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-500 max-w-xl">
            <p className="italic">
              Footnote: This platform is intended solely for simulations and analytical purposes. It does not offer or constitute financial, investment, trading, or professional advice of any kind.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Nuclear Supply Chain Calculator • All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
