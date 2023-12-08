import {FC} from 'react';

import {CarForm, Cars} from "../../components";
import {useAppSelector} from "../../hooks";

const CarsPage: FC = () => {
    const {me} = useAppSelector(state => state.auth);

    return (
        <div>
            {me ? <CarForm/> : <div>Please Login</div>}
            <hr/>
            <Cars/>
        </div>
    );
};

export {CarsPage};