import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import 'moment/locale/es';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './picture.css';
import Controls from '../controls/Controls';
import DeleteControl from '../controls/DeleteControl';
moment.locale('es');

export const Picture = ({picture}) => {
    return (
        <div className="pb-4">
            <div className="card mb-3 picture">
                <div className="image-container">
                    <LazyLoadImage 
                        alt={picture.title}
                        src={picture.picture}
                        effect="blur"
                    />
                    </div> 
                
                {/* <img className="image-motion" src={picture.picture} alt={picture.title} /> */}
                <div className="card-body">
                    <p className="card-text">{picture.title}</p>
                    <div className="card-metadata">
                        <p className="card-text">
                            <small className="text-muted">Creado <span>{moment(picture.created_at.seconds*1000).fromNow()}</span> por <span>{picture.created_by}</span></small>
                        </p>
                        <Controls>
                            <DeleteControl picture={picture}></DeleteControl>
                        </Controls>
                    </div>
                </div>
            </div>
        </div>
    )
}

Picture.propTypes = {
    picture: PropTypes.object
};

export default Picture;