import React,{useEffect,useState} from "react";
// import "./App.css";

import Cropper from "react-easy-crop";
import Slider from '@mui/material/Slider';

import Button from '@mui/material/Button';
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { generateDownload } from "./utils/cropImage";

export default function App() {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const [customWidth, setCustomWidth] = useState(100);
	const [customHeight, setCustomHeight] = useState(100);
  

	
  const { videoname, MRID, name } = useParams();

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = () => {
		generateDownload(image, croppedArea,name);
	};

	useEffect(() => {
		const handleResize = () => {
		  if (window.innerWidth <= 600) {
			setCustomWidth(175);
			setCustomHeight(175);
		  } else {
			setCustomWidth(390);
			setCustomHeight(390);
		  }
		};
	
		// Initial setup
		handleResize();
	
		// Add event listener for window resize
		window.addEventListener("resize", handleResize);
	
		// Clean up event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	  }, []);

	return (
		<div className='container'>
			<div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper '>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={customWidth / customHeight}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
								cropSize={{ width: customWidth, height: customHeight }}
							/>
						</div>

						<div className='slider sm:w-[430px] relative sm:left-[350px]'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>

				<div className=" sm:relative sm:left-[10px] sm:top-[-10px]  flex justify-center items-center"> 


				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>
				<Button variant='contained' color='secondary' onClick={onDownload}>
					Download
				</Button>
				</div>

			</div>
		</div>
	);
}
