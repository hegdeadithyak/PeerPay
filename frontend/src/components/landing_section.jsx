import propTypes from 'prop-types';

export function Section({head, subhead, button,button_directs}){
    return <>
        <section className="hero bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{head}</h1>
                    <p className="text-lg mb-8">{subhead}</p>
                    <a href={button_directs} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold">{button}</a>
                </div>
            </section>
    </>
}


Section.propTypes = {
    head: propTypes.string.isRequired,
    subhead: propTypes.string.isRequired,
    button: propTypes.string.isRequired,
    button_directs: propTypes.string.isRequired
};
