import './category.css';

const Category = ({ title }: { title: any }) => {
    return (
        <div className="cat_card">
            <h4>{title}</h4>
            <div className="cat_img">
                <img src="./temp/rec_ev_placeholder.svg" />
            </div>
        </div>
    );
};

export default Category;
