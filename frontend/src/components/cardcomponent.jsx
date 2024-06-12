import propTypes from 'prop-types';

export function CardComponenet({title, description}){
    return <>
        <div className="feature-item p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p>{description}</p>
        </div>
    </>
}

CardComponenet.propTypes = {
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired
}

