import React, { useRef, useState } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    Grow,
    IconButton,
    TextField,
} from '@mui/material'
import { Camera, CameraProps } from 'react-camera-pro'
import { PhotoCamera } from '@mui/icons-material'
import { TransitionGroup } from 'react-transition-group'

const errorMessages = {
    noCameraAccessible:
        'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied:
        'Permission denied. Please refresh and give camera permission.',
    switchCamera:
        'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.',
}

function CameraPopup({
    popupOpened,
    setPopupOpened,
    chosenSquares,
}: {
    popupOpened: boolean
    setPopupOpened: React.Dispatch<React.SetStateAction<boolean>>
    chosenSquares: string[]
}) {
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [isTaking, setIsTaking] = useState(false)
    const [isSendingData, setIsSendingData] = useState(false)
    const [price, setPrice] = useState<number>(0)
    const camera = useRef<React.ForwardRefExoticComponent<CameraProps> | null>(
        null
    )

    const capture = () => {
        if (!camera.current) return
        // @ts-ignore
        setImageURL(camera.current.takePhoto())
    }

    const sendData = async () => {
        setIsSendingData(true)
        // PLEASE SEND DATA HERE

        // CLEANING AFTER SENDING
        setIsSendingData(false)
        setImageURL(null)
        setPrice(0)
        setPopupOpened(false)
    }

    return (
        <Dialog
            open={popupOpened}
            aria-labelledby="please take a photo"
            aria-describedby="to confirm the claimed land"
            fullScreen
        >
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ marginBottom: '1rem' }}
                >
                    In order to confirm the claimed land, please, take a photo
                </DialogContentText>
                <TransitionGroup>
                    {isTaking ? (
                        <Grow in={isTaking}>
                            <Box>
                                <Box sx={{ width: '100%', maxWidth: '400px' }}>
                                    <Camera
                                        ref={camera}
                                        errorMessages={errorMessages}
                                        aspectRatio={16 / 9}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconButton
                                        aria-label="take a photo"
                                        onClick={() => {
                                            capture()
                                            setIsTaking(false)
                                        }}
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grow>
                    ) : (
                        <Grow in={!isTaking}>
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
                                        value={price === 0 ? '' : price}
                                        onChange={(e) => {
                                            if (!isNaN(+e.target.value)) {
                                                setPrice(+e.target.value)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    Image
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setIsTaking(true)}
                                    >
                                        Take a photo
                                    </Button>
                                </Grid>
                                {imageURL && (
                                    <>
                                        <Grid item xs={6}>
                                            Taken photo
                                        </Grid>
                                        <Grid item xs={6}>
                                            <img
                                                src={imageURL}
                                                alt="Image preview"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={12}>
                                    <Button
                                        onClick={sendData}
                                        variant="contained"
                                        disabled={
                                            !imageURL || !price || isSendingData
                                        }
                                    >
                                        Send data
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grow>
                    )}
                </TransitionGroup>
            </DialogContent>
        </Dialog>
    )
}

export default CameraPopup
