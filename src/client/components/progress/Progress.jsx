import React from 'react';

const styles = ({ value, color }) => {
    return {
        container :{
            display: 'flex',
            alignItems: 'center'
        },
        progress: {
            width: `${value}%`,
            height: 19,
            backgroundColor: color,
            color: "white",
            borderRadius: 4,
            marginRight: 2,
            padding: 3
        }

    };
};

export default ({ value, color }) => {
    const labelOut = value <= 24;
    const style = styles({ value, color });
    
    return(
    <div style={style.container}>
        <div style={style.progress} >
            {!labelOut && <span>{value}%</span>}
        </div>
        {labelOut && <span>{value}%</span>}
    </div>
)};