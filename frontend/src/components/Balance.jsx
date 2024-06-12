import PropTypes from 'prop-types';

export function Balance({value}){
    return <div className="flex">
        <div className="text-lg font-bold"> Your Balance:  </div>
        <div className="text-lg ml-4 font-semibold"> Rs{value} </div>
    </div>
}

Balance.propTypes = {
    value: PropTypes.number.isRequired
}

