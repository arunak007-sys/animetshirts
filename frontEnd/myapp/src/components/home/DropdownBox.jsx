import { Link } from "react-router-dom";

 const DropdownBox = () => {
    // Content of your dropdown box
    return (
        <div className="dropdown-box"
            style={{
                position: 'absolute',
                top: 'calc(80% + 5px)', // Adjust the distance below the link
                left: '50%', // Center horizontally relative to the link
                transform: 'translateX(-50%)', // Center horizontally
                zIndex: 999,
                backgroundColor: 'black',
                // boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                padding: '10px', // Add padding for better appearance 
                height: '230px',
                width: '400px',
                // background:'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'center' // Center content vertically
            }}
        >
            <div className="leftDropDwon"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNH'>NARUTO</Link>
                <Link className='linksNH'>ONE PIECE</Link>
                <Link className='linksNH'>JUJUSTU KAISEN</Link>
                <Link className='linksNH'>TOKYO REVENGERS</Link>
            </div>
            <div className="rightDropDown"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNH'>DRAGON BALL</Link>
                <Link className='linksNH'>ATTACK ON TITAN</Link>
                <Link className='linksNH'>DEMON SLAYER</Link>
            </div>

        </div>
    );
};
export default DropdownBox