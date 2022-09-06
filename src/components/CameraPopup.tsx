import React, { useRef, useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    TextField,
} from '@mui/material'
import { Camera, CameraProps } from 'react-camera-pro'

const errorMessages = {
    noCameraAccessible:
        'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied:
        'Permission denied. Please refresh and give camera permission.',
    switchCamera:
        'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.',
}

function CameraPopup({ popupOpen }: { popupOpen: boolean }) {
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [isTaking, setIsTaking] = useState(false)
    const [price, setPrice] = useState<number | undefined>()
    const camera = useRef<React.ForwardRefExoticComponent<CameraProps> | null>(
        null
    )

    const capture = () => {
        if (!camera.current) return
        // @ts-ignore
        setImageURL(camera.current.takePhoto())
    }

    return (
        <Dialog
            open={popupOpen}
            aria-labelledby="please take a photo"
            aria-describedby="to confirm the claimed land"
            fullScreen
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    In order to confirm the claimed land, please, take a photo
                </DialogContentText>
                {imageURL && <img src={imageURL} alt="Image preview" />}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Price
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        Image
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={capture}>
                            Take a photo
                        </Button>
                    </Grid>
                </Grid>

                {isTaking ? (
                    <div style={{ width: '100%' }}>
                        <Camera
                            ref={camera}
                            errorMessages={errorMessages}
                            aspectRatio={16 / 9}
                        />
                    </div>
                ) : (
                    <></>
                    // <Button variant="contained" onClick={capture}>
                    //     Take a photo
                    // </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CameraPopup
