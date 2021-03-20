import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, email } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email,
                success: true,
            };
            return signInUser;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            const signOutUser = {
                isSignIn: false,
                name: "",
                email: "",
                error: "",
                success: false,
            };
            return signOutUser;
        })
        .catch((err) => {
            console.log(err);
        });
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    })
        .then(() => {})
        .catch((error) => {
            console.log(error);
        });
};

export const createUserEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};
