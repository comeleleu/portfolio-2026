export const Footer = () => {
    return (
        <footer className="flex flex-row justify-between text-sm text-neutral-500 border-t border-neutral-800 pt-6 sm:pt-10">
            <p>© {new Date().getFullYear()} - Côme Leleu</p>
            <p>
                Créé avec <a href="https://nextjs.org/" className="text-neutral-300 hover:text-neutral-300 transition-colors" target="_blank" rel="noopener noreferrer">Next.js</a> et <a href="https://tailwindcss.com/" className="text-neutral-300 hover:text-neutral-300 transition-colors" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
            </p>
        </footer>
    );
};