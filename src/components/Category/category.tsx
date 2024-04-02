import './category.css';

const Category = ({ title, picture }: { title: string,picture:string }) => {console.log({picture})
    return (
        <div className="cat_card">
            <h4>{title}</h4>
            <div className="cat_img">
                <img src={picture} />
            </div>
        </div>
    );
};

export default Category;
