import PropTypes from 'prop-types';

export const Appbar = ({ user, logout }) => {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-row justify-center h-full ml-4 flex items-center">
        <img src="peerpay.svg" alt="PeerPay Logo" className="h-10 w-10 rounded-full mr-2" />
        PeerPay
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {user.username}
        </div>
        <div className="rounded-xl h-10 w-20 bg-slate-800 flex justify-center mt-2 mr-2">
          <div className="flex flex-col justify-center h-full text-slate-100">
            <button onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Appbar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
