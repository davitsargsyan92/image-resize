import React, { useState} from 'react';
import { Mark } from "./interfaces/interfaces";
import './App.scss';

const MAX_ALLOWED_MARKS_ON_IMAGE = 2;


// I DIDNOT SPLITED APP INTO MULTIPLE COMPONENTS  , JUST TO PROVIDE ALL FUNCTIONALITY IN ONE FILE , TO BE EASY TO REVIEW
function App() : JSX.Element {
    const [preview , setPreview ] = useState<string>("");
    const [rotateDegree , setRotateDegree] = useState<number>(0);
    const [marks , setMarks] = useState<Mark[]>([]);


    const addMarkClick = (event : React.MouseEvent<HTMLImageElement>): void => {
        if(marks.length === MAX_ALLOWED_MARKS_ON_IMAGE){
            return
        }

        const {top , left , height , width} = event.currentTarget.getBoundingClientRect();

        const {clientX , clientY} = event;
        const mark : Mark = {
            x : ((clientX - left) / width) * 100,
            y: ((clientY - top) / height) * 100
        }

        setMarks(prev => [...prev, mark]);

    }

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files as FileList;
        const image = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);

            const image = new Image();
            image.src = reader.result as string;
            image.onload = () => {
                const degree = image.height > image.width ? 90 : 0
                setRotateDegree(degree)
            }
        }
        reader.readAsDataURL(image);

    }



    return (

            preview ? (
               <div className="image-container">
                   <img src={preview} className="image" onClick={addMarkClick} style={{
                       transform : `rotate(${rotateDegree}deg)`
                   }}/>
                       {marks.map(mark => (
                           <div className="mark" style={{
                               top : `${mark.y}%`,
                               left: `${mark.x}%`
                           }}>
                               Some note on picture
                           </div>
                       ))}

               </div>

            ) : (
                <div className="container">
                    <h1 >Image-upload with preview</h1>
                    <div className="wrapper">

                        <div className="box">
                            <div className="js--image-preview"/>
                            <div className="upload-options">

                                <label>
                                    <input
                                        type="file"
                                        className="image-upload"
                                        accept="image/*"
                                        onChange={handleAddImage}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )

  );
}

export default App;
