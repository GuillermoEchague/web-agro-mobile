import React, {useContext, useEffect} from 'react'
import { connect } from 'react-redux'
import { getUserPictures } from '../../redux/actions/userPictureActions';
import {AuthContext} from '../../context/AuthContext';
import Pictures from '../../components/Picture/Pictures/Pictures';


export const User = ({actions, pictures, pagination, paginationEnd, isFetching}) => {

    const {user} = useContext(AuthContext);

    useEffect(() => {
        actions.getUserPictures(pagination.lastDocument, pagination.limit, user.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMore = () => {
        if (isFetching || paginationEnd) {
            return;
        }
        actions.getUserPictures(pagination.lastDocument, pagination.limit, user.uid);
    }

    return <div>
        <Pictures
            pictures={pictures}
            inBottomCallback={loadMore}
            isFetching={isFetching}
        />
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getUserPictures: (lastDocument, limit, userId) => dispatch(getUserPictures(lastDocument, limit, userId))
        }
    }
}

const mapStateTopProps = (state) => ({
   pictures: state.userPictures.pictures,
   pagination: state.userPictures.pagination,
   paginationEnd: state.userPictures.paginationEnd,
   isFetching: state.userPictures.isFetching
})

export default connect(mapStateTopProps, mapDispatchToProps)(User);
