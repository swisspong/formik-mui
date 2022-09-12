import { Box, Button, FormControl, FormHelperText } from "@mui/material";
import { useField, useFormikContext, getIn } from "formik";
import React, { useState } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import PreviewImage from "./PreviewImage";
import { useCreateCategoryImageMutation } from "../../features/categorySlice";

const ImageWrapper = ({ name, label, multiple, initUrl, ...otherProps }) => {
  const [field, meta] = useField(name);
  const [image, setImage] = useState(null);
  console.log(initUrl);
  ///config here
  // const [url, setUrl] = useState(
  //   initUrl ? (multiple ? (initUrl ? initUrl : []) : null) : null
  // );
  const [url, setUrl] = useState(
    multiple ? (initUrl ? initUrl : []) : initUrl ? initUrl : null
  );
  console.log(url);
  const [isUploading, setIsUploading] = useState(null);
  const [createCategoryImage, { isLoading }] = useCreateCategoryImageMutation();
  const { setFieldValue, values } = useFormikContext();
  const changeHandler = (e) => {
    if (multiple) {
      if (e.target.files[0]) {
        const files = Array.from(e.target.files).map((file) => file);
        const promises = [];
        let initUploading = [];
        for (let i = 0; i < files.length; i++) {
          initUploading.push(false);
        }
        setIsUploading(initUploading);
        console.log(isUploading);
        for (let i = 0; i < files.length; i++) {
          var formData = new FormData();
          formData.append("asset", files[i]);
          promises.push(
            createCategoryImage(formData)
              .unwrap()
              .then((res) => {
                return res;
              })
              .catch((err) => console.log(err))
          );
        }

        Promise.all(promises).then((res) => {
          console.log(getIn(values, name));
          console.log(res.map((result) => result.result.id));
          setFieldValue(name, [
            ...getIn(values, name),
            ...res.map((result) => result.result.id),
          ]);
          console.log(res.map((result) => result.result.path));
          setUrl((prevState) => {
            return [...prevState, ...res.map((result) => result.result.path)];
          });
          setImage(null);
        });

        setImage(files);
        //setFieldValue(name, files);
      }
    } else {
      if (e.target.files[0]) {
        setUrl(null);
        setImage(null);

        var formData = new FormData();
        formData.append("asset", e.target.files[0]);
        createCategoryImage(formData)
          .unwrap()
          .then((res) => {
            setFieldValue(name, res.result.id);
            setUrl(res.result.path);
            setImage(null);
          })
          .catch((err) => console.log(err));
        setImage(e.target.files[0]);
      }
      // setFieldValue(name, e.target.files[0]);
    }
  };
  const deleteHandler = (index) => {
    if (multiple) {
      const tmp = getIn(values, name);
      tmp.splice(index, 1);
      setFieldValue(name, tmp);
      setUrl((prevState) => {
        const tmp = prevState;
        tmp.splice(index, 1);
        console.log(tmp);
        return tmp;
      });
      setImage(null);
    } else {
      setFieldValue(name, "");
      setImage(null);
      setUrl(null);
    }
  };
  return (
    <Box
      display={"flex"}
      sx={{
        // m: 1,
        mx: 1,
        my: 2,
      }}
    >
      <FormControl
        sx={{ minWidth: 120, width: "100%" }}
        error={meta.touched && meta.error}
        fullWidth
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          sx={{
            p: 2,
            w: 1,
            border: "2px dashed grey",
            // borderColor: "error.main",
            borderColor: "grey.500",
            borderRadius: 1,
            bgcolor: "grey.50",
          }}
        >
          <Box
            display={"flex"}
            flexDirection="column"
            flexGrow={1}
            alignContent={"flex-start"}
          >
            {/* {getIn(values, name) && (
              <Box flexGrow={1} display={"flex"} gap={1} flexWrap="wrap">
                {multiple ? (
                  getIn(values, name).map((file) => (
                    <PreviewImage file={file} />
                  ))
                ) : (
                  <PreviewImage file={getIn(values, name)} />
                )}
              </Box>
            )} */}

            {(image || url) && (
              <Box flexGrow={1} display={"flex"} gap={1} flexWrap="wrap">
                {multiple ? (
                  // getIn(values, name).map((file) => (
                  //   <PreviewImage file={file} />
                  // )
                  <>
                    {Array.isArray(url) &&
                      url.map((urlItem, index) => {
                        return (
                          <PreviewImage
                            url={urlItem}
                            // isLoading={isLoading}
                            deleteHandler={() => deleteHandler(index)}
                          />
                        );
                      })}
                    {Array.isArray(image) &&
                      image.map((file, index) => (
                        <PreviewImage file={file} isLoading={isLoading} />
                      ))}
                    {/* {Array.isArray(image)
                      ? image.map((file, index) => (
                          <PreviewImage file={file} isLoading={isLoading} />
                        ))
                      : url.map((urlItem, index) => {
                          console.log(url, url.length);
                          return (
                            <PreviewImage
                              urlItem={urlItem}
                              isLoading={isLoading}
                              deleteHandler={() => deleteHandler(index)}
                            />
                          );
                        })} */}
                  </>
                ) : (
                  <PreviewImage
                    deleteHandler={deleteHandler}
                    file={image}
                    isLoading={isLoading}
                    url={url}
                  />
                )}
              </Box>
            )}
            <Box
              mt={
                ((Array.isArray(getIn(values, name)) &&
                  getIn(values, name).length > 0) ||
                  (!Array.isArray(getIn(values, name)) &&
                    getIn(values, name))) &&
                2
              }
              //mt={(image || url) && 2}
              flexGrow={1}
              display={"flex"}
              justifyContent={"center"}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoIcon />}
              >
                {label}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple={multiple}
                  // onChange={(e) => setFieldValue(name, e.target.files[0])}
                  onChange={changeHandler}
                />
              </Button>
            </Box>
          </Box>
        </Box>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default ImageWrapper;
