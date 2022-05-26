import PropTypes from 'prop-types';
import Picture from '../Picture/Picture';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Pictures = ({pictures, isFetching, inBottomCallback}) =>{
    const renderPictures = () => {
        return pictures.map(picture => {
            return <Picture key={Picture.id} picture={picture}></Picture>
        })
    }

    const inBottom = () => {
        inBottomCallback();
    }
    useBottomScrollListener( inBottom, {
        offset: 1,
        triggerOnNoScroll: false
    });

    return <div>
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 col-sm-8 mx-auto">
                    {renderPictures()}

                    { isFetching && <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div> }

                </div>
            </div>
        </div>
        </div>
}

Pictures.propTypes = {
    pictures: PropTypes.array,
    isFetching: PropTypes.bool
};

export default Pictures;