
import React from 'react';
import PropTypes from 'prop-types';

interface StarsProps {
    rating: number;
}

const Stars: React.FC<StarsProps> = ({ rating }) => {
    const totalStars = 5;

    return (
        <div className="rating-stars">
            {[...Array(totalStars)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 12 12"
                    fill={index < rating ? "var(--star-color)" : "none"}
                    stroke={index < rating ? "var(--star-color)" : "black"}
                    style={{ marginRight: '3px' }}>
                    <path
                        d="M7.28359 3.62492L7.43894 3.92658L7.77665 3.89364L10.8078 3.59796L9.07218 5.67982L8.80217 6.0037L9.07582 6.3245L10.8228 8.37245L7.77357 8.09407L7.43387 8.06306L7.28107 8.36804L6.0146 10.896L4.71641 8.37508L4.56106 8.07342L4.22335 8.10636L1.19216 8.40204L2.92782 6.32018L3.19783 5.9963L2.92418 5.6755L1.17718 3.62755L4.22643 3.90593L4.56613 3.93694L4.71893 3.63196L5.9854 1.10402L7.28359 3.62492Z"
                    />
                </svg>
            ))}
        </div>
    );
};

Stars.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default Stars;