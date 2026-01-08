export const About = () => {
    return (
        <section id="about" className="grid grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_300px] gap-10">
            <div className="flex flex-col gap-8">
                <h1 className="text-6xl font-bold text-neutral-100">Côme Leleu</h1>
                <h2 className="text-4xl text-neutral-300">Full-Stack Developer</h2>
                <p className="text-neutral-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed hendrerit odio. Maecenas sed auctor dolor. Duis luctus metus id eleifend egestas. Nam faucibus neque in urna maximus, cursus congue sapien euismod. Suspendisse vestibulum leo eu neque dictum maximus. Praesent eget elit eu erat ultrices dignissim a ut nibh. Phasellus vestibulum enim sed mauris faucibus porta. Suspendisse iaculis, nisl ac congue varius, justo nulla tempus lectus, nec ullamcorper leo sem at orci. Nulla libero mi, tincidunt eu enim ut, hendrerit eleifend mi. Curabitur in varius tellus, non imperdiet dui. Cras ullamcorper in mi varius blandit. Cras tincidunt gravida mauris, quis viverra nisi dictum id. Nunc ipsum justo, ornare non euismod a, iaculis eu elit. Donec molestie vel lacus id cursus.<br />Nam consectetur lectus dolor, id vehicula neque condimentum at. Quisque mollis dictum ultricies. Etiam varius et tellus eu cursus. Praesent eget sagittis magna, et ultrices metus. Pellentesque quis turpis a turpis suscipit luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras egestas, nibh sollicitudin faucibus convallis, dolor neque tristique odio, sit amet auctor nibh lorem vel nulla. Nam viverra nisi lectus, sit amet rhoncus odio congue quis.</p>
            </div>
            <div className="self-start md:sticky md:top-10">
                <img src="https://placehold.co/300x350/111/555" alt="Profile Picture" className="w-full max-h-96 object-cover" />
            </div>
        </section>
    );
};