import PropTypes from 'prop-types';

export function Subheading({label}){
    return <>
        <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            {label}
        </div>
    </>
}
Subheading.propTypes = {
    label: PropTypes.string.isRequired
};
