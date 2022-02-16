import React from 'react';
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/client";
import {ADD_TO_BOOKSHELF, GET_BOOKSHELF} from "../../../Util/graphql";
import Loader from "../../../Util/Loader/Loader";
import {OverrideProps} from "@material-ui/core/OverridableComponent";

type propsType = {
    isBookInBookshelf: boolean|undefined
    bookId: number
}

const AddToBookshelf: React.FC<propsType> = ({isBookInBookshelf, bookId}) => {
    const [addOrRemoveBook, {loading}]: OverrideProps<any, any> =  useMutation(ADD_TO_BOOKSHELF, {
        refetchQueries: [
            GET_BOOKSHELF
        ], variables: {bookId: bookId}
    });

    if (loading) return <Loader/>;

    return (
        isBookInBookshelf ?
            <div>
                <Button onClick={addOrRemoveBook}>Remove from bookshelf</Button>
            </div>
            :
            <div>
                <Button onClick={addOrRemoveBook}>Add to bookshelf</Button>
            </div>
    );
};

export default AddToBookshelf;