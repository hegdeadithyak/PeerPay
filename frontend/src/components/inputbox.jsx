import PropTypes from 'prop-types';

export function InputBox({label,placeholder}){
    return <>
        <div className="text-sm font-medium text-left py-2">
            {label}
            <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
    </>
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};
