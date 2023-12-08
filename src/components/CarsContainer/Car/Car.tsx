import {FC, PropsWithChildren, useRef, useState} from 'react';

import {ICar} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {carActions} from "../../../store";
import empty from '../../../assets/images/empty_image.png';

interface IProps extends PropsWithChildren {
    car: ICar;
}

const Car: FC<IProps> = ({car}) => {
    const {id, brand, price, year, photo} = car;
    const dispatch = useAppDispatch();
    const fileInput = useRef<HTMLInputElement>();
    const [image, setImage] = useState<string>(null);

    const addCarForUpdate = () => {
        dispatch(carActions.setCarForUpdate(car));
    };

    const deleteCar = async () => {
        await dispatch(carActions.deleteCar({id}));
    };

    const addPhoto = async (): Promise<void> => {
        const formData = new FormData();
        const file: Blob = fileInput.current.files[0];
        formData.append('photo', file);
        await dispatch(carActions.addPhoto({id, photo: formData}));
        setImage(URL.createObjectURL(file));
    }

    return (
        <div style={{display: 'flex', gap:'50px'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <img src={photo || image || empty}
                     alt={brand}
                     style={{cursor: photo || image ? 'default' : 'pointer'}}
                     width={'300px'}
                     onClick={() => fileInput.current.click()}
                />
                <button onClick={deleteCar}>Delete</button>
                <button onClick={addCarForUpdate}>Update</button>
            </div>
            <div>
                <div>id: {id}</div>
                <div>brand: {brand}</div>
                <div>price: {price}</div>
                <div>year: {year}</div>
                <input type="file"
                       accept={"image/jpeg, image/png"}
                       ref={fileInput}
                       style={{display: 'none'}}
                       disabled={!!photo || !!image}
                       onChange={addPhoto}
                />
            </div>
        </div>
    );
};

export {Car};