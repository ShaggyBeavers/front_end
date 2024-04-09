import { Link } from 'react-router-dom';

const RelicItem = ({ data: { id, name, status, displayImage } }: any) => {
    return (
        <Link key={id} to={`/catalogue/${id}`} className="cat-item">
            {/* <img src={item.imageUrl} /> */}
            {displayImage && (
                <img src={`data:image/png;base64,${displayImage}`} />
            )}
            <div className="cat-item-title">
                <p>{name}</p>
                {/* {status && <p>{status}</p>} */}
            </div>
        </Link>
    );
};

export default RelicItem;
