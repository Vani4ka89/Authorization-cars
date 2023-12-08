import {FC, PropsWithChildren} from 'react';

interface IProps extends PropsWithChildren {

}

const User: FC<IProps> = () => {
    return (
        <div>
            User
        </div>
    );
};

export {User};