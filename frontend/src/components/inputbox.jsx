import PropTypes from 'prop-types';

export function InputBox({ label, placeholder, value, onChange }) {
    return (
        <div className="text-sm font-medium text-left py-2">
            <label className="block mb-1">{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>
    );
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
