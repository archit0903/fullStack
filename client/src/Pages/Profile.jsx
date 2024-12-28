import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const fileRef = useRef(null);
  const { CurrentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(CurrentUser.avatar);  // Add state to handle avatar preview

  console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('There was an error uploading the file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
          setAvatarPreview(downloadURL);  // Update avatar preview with the newly uploaded image URL
        console.log(downloadURL);
        });
      }
    );
  };

  return (
    <div className="p-3 max-width-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          id=""
          hidden
          accept="image/*"
        />
        {/* Show the avatar preview or current user's avatar */}
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={avatarPreview || CurrentUser.avatar}
          alt="profile"
        />
        <p>
          
        </p>
        <input id="username" type="text" placeholder="username" className="border p-3 rounded-lg" />
        <input id="email" type="email" placeholder="email" className="border p-3 rounded-lg" />
        <input id="password" type="text" placeholder="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled: opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
