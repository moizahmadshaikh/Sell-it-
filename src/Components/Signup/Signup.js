import React, { useState } from "react";
import reactRouterDom, { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";
import video from '../../assets/video/mixkit-checking-an-item-on-a-sales-site-on-a-cell-42123-medium.mp4'

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const [inputActive, setInputActive] = useState(false);
  const handleInputChange = (e) => {
    if (e.target.value !== '') {
      setInputActive(true);
    } else {
      setInputActive(false);
    }
  };
  const handleSubmit = (e) => {
    setLoading(true)
    let btn = document.getElementById("btn")
    btn.disabled = true;
    let main = document.getElementById("main");
    let video = document.getElementById('video');
    main.style.opacity= "0.1";
    video.style.display="none"
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name }).then(() => {
          Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
            Product_Id: []
          });
        });
      })
      .then(() => {
        history.push("/login");
      }).catch((error)=>{
        alert(error);
        setLoading(false)
        btn.disabled = false;
        
        main.style.opacity= "1";
        video.style.display="block"
        
      })
  };
  return (<>
    {loading && <SignUpLoading/> } <div>
    <div className="loginvideo " id="video">
      <div  className="backblack"></div>
      <video src={video} autoPlay loop muted ></video>
    </div>
          <div className="signupmain" id="main">
          <div className="signUpParentDiv">
          <svg xmlns="http://www.w3.org/2000/svg" width="130" height="90" fill="none" viewBox="0 0 92 40">
  <path fill="#fff" stroke="#000" d="M6 .5h58.5v39H6A5.5 5.5 0 0 1 .5 34V6A5.5 5.5 0 0 1 6 .5Z"/>
  <path fill="#000" d="M21.546 13.546c-.137-1.152-.69-2.046-1.66-2.682-.97-.637-2.159-.955-3.568-.955-1.03 0-1.932.167-2.704.5-.766.333-1.364.792-1.796 1.375a3.295 3.295 0 0 0-.636 1.989c0 .62.147 1.155.443 1.602.303.44.69.807 1.16 1.102a8.24 8.24 0 0 0 1.476.716c.516.182.989.33 1.42.443l2.365.637c.605.159 1.28.378 2.022.659a9.34 9.34 0 0 1 2.148 1.148 5.846 5.846 0 0 1 1.704 1.84c.447.75.67 1.67.67 2.762 0 1.257-.329 2.394-.988 3.409-.651 1.015-1.606 1.822-2.863 2.42-1.25.599-2.77.898-4.557.898-1.667 0-3.11-.269-4.33-.807-1.212-.538-2.166-1.288-2.863-2.25-.69-.962-1.08-2.08-1.17-3.352h2.908c.076.879.371 1.606.887 2.182.522.568 1.181.992 1.977 1.273a8.025 8.025 0 0 0 2.59.409c1.077 0 2.043-.175 2.898-.523.857-.356 1.535-.849 2.035-1.477.5-.637.75-1.38.75-2.228 0-.772-.216-1.401-.648-1.886-.432-.485-1-.879-1.705-1.182a17.923 17.923 0 0 0-2.284-.795l-2.863-.819c-1.819-.522-3.258-1.268-4.319-2.238-1.06-.97-1.59-2.239-1.59-3.807 0-1.303.352-2.44 1.056-3.409.713-.977 1.667-1.735 2.864-2.273 1.204-.545 2.55-.818 4.034-.818 1.5 0 2.833.269 4 .807 1.167.53 2.091 1.257 2.773 2.182a5.435 5.435 0 0 1 1.09 3.148h-2.726Zm14.633 17.818c-1.682 0-3.133-.372-4.352-1.114-1.212-.75-2.148-1.796-2.807-3.136-.652-1.349-.977-2.917-.977-4.705 0-1.788.325-3.363.977-4.727.659-1.371 1.576-2.44 2.75-3.205 1.182-.773 2.56-1.159 4.136-1.159.91 0 1.807.152 2.693.455a6.674 6.674 0 0 1 2.42 1.477c.728.674 1.308 1.568 1.74 2.682.431 1.114.647 2.485.647 4.114v1.136H29.952v-2.318h10.727c0-.985-.197-1.864-.59-2.637a4.453 4.453 0 0 0-1.66-1.83c-.712-.446-1.553-.67-2.523-.67-1.068 0-1.992.265-2.773.796a5.234 5.234 0 0 0-1.784 2.045 6.01 6.01 0 0 0-.625 2.705v1.545c0 1.318.228 2.436.682 3.352.462.91 1.102 1.603 1.92 2.08.819.47 1.77.704 2.853.704.704 0 1.34-.098 1.91-.295a4.088 4.088 0 0 0 1.488-.909 4.13 4.13 0 0 0 .966-1.523l2.59.727a5.743 5.743 0 0 1-1.375 2.319c-.643.659-1.439 1.174-2.386 1.545-.947.364-2.011.546-3.193.546ZM50.168 7.727V31h-2.682V7.727h2.682Zm7.593 0V31H55.08V7.727h2.681Z"/>
  <path fill="#000" fillOpacity=".2" d="M21.546 13.546c-.137-1.152-.69-2.046-1.66-2.682-.97-.637-2.159-.955-3.568-.955-1.03 0-1.932.167-2.704.5-.766.333-1.364.792-1.796 1.375a3.295 3.295 0 0 0-.636 1.989c0 .62.147 1.155.443 1.602.303.44.69.807 1.16 1.102a8.24 8.24 0 0 0 1.476.716c.516.182.989.33 1.42.443l2.365.637c.605.159 1.28.378 2.022.659a9.34 9.34 0 0 1 2.148 1.148 5.846 5.846 0 0 1 1.704 1.84c.447.75.67 1.67.67 2.762 0 1.257-.329 2.394-.988 3.409-.651 1.015-1.606 1.822-2.863 2.42-1.25.599-2.77.898-4.557.898-1.667 0-3.11-.269-4.33-.807-1.212-.538-2.166-1.288-2.863-2.25-.69-.962-1.08-2.08-1.17-3.352h2.908c.076.879.371 1.606.887 2.182.522.568 1.181.992 1.977 1.273a8.025 8.025 0 0 0 2.59.409c1.077 0 2.043-.175 2.898-.523.857-.356 1.535-.849 2.035-1.477.5-.637.75-1.38.75-2.228 0-.772-.216-1.401-.648-1.886-.432-.485-1-.879-1.705-1.182a17.923 17.923 0 0 0-2.284-.795l-2.863-.819c-1.819-.522-3.258-1.268-4.319-2.238-1.06-.97-1.59-2.239-1.59-3.807 0-1.303.352-2.44 1.056-3.409.713-.977 1.667-1.735 2.864-2.273 1.204-.545 2.55-.818 4.034-.818 1.5 0 2.833.269 4 .807 1.167.53 2.091 1.257 2.773 2.182a5.435 5.435 0 0 1 1.09 3.148h-2.726Zm14.633 17.818c-1.682 0-3.133-.372-4.352-1.114-1.212-.75-2.148-1.796-2.807-3.136-.652-1.349-.977-2.917-.977-4.705 0-1.788.325-3.363.977-4.727.659-1.371 1.576-2.44 2.75-3.205 1.182-.773 2.56-1.159 4.136-1.159.91 0 1.807.152 2.693.455a6.674 6.674 0 0 1 2.42 1.477c.728.674 1.308 1.568 1.74 2.682.431 1.114.647 2.485.647 4.114v1.136H29.952v-2.318h10.727c0-.985-.197-1.864-.59-2.637a4.453 4.453 0 0 0-1.66-1.83c-.712-.446-1.553-.67-2.523-.67-1.068 0-1.992.265-2.773.796a5.234 5.234 0 0 0-1.784 2.045 6.01 6.01 0 0 0-.625 2.705v1.545c0 1.318.228 2.436.682 3.352.462.91 1.102 1.603 1.92 2.08.819.47 1.77.704 2.853.704.704 0 1.34-.098 1.91-.295a4.088 4.088 0 0 0 1.488-.909 4.13 4.13 0 0 0 .966-1.523l2.59.727a5.743 5.743 0 0 1-1.375 2.319c-.643.659-1.439 1.174-2.386 1.545-.947.364-2.011.546-3.193.546ZM50.168 7.727V31h-2.682V7.727h2.682Zm7.593 0V31H55.08V7.727h2.681Z"/>
  <path fill="#000" d="m21.546 13.546-.497.058.052.442h.445v-.5Zm-1.66-2.682-.274.418.274-.418Zm-6.272-.455-.198-.459h-.002l.2.46Zm-1.796 1.375-.402-.297-.002.003.404.294Zm-.193 3.591-.417.276.005.008.412-.284Zm1.16 1.102-.267.424.005.003.261-.427Zm1.476.716-.172.47.006.002.166-.472Zm1.42.443.13-.482-.002-.001-.127.483Zm2.365.637-.13.483h.003l.127-.483Zm2.022.659-.176.468h.001l.175-.468Zm2.148 1.148-.29.407.005.004.285-.412Zm1.704 1.84.43-.256-.43.256Zm-.318 6.17-.42-.271v.002l.42.27Zm-2.863 2.421-.215-.451h-.001l.216.451Zm-8.887.091-.203.457h.002l.201-.457Zm-2.863-2.25-.407.291.002.003.405-.294ZM7.819 25v-.5H7.28l.038.536.5-.036Zm2.908 0 .498-.043-.039-.457h-.459v.5Zm.887 2.182-.373.333.005.005.368-.338Zm1.977 1.273-.166.471.005.002.16-.474Zm5.489-.114.188.463.004-.001-.192-.462Zm2.034-1.477.391.31.002-.002-.393-.308Zm.102-4.114.373-.332-.373.332Zm-1.705-1.182-.197.46.197-.46Zm-2.284-.795-.137.48.003.002.134-.482Zm-2.863-.819-.139.481h.001l.138-.48Zm-4.319-2.238-.337.369.338-.37ZM9.511 10.5l-.404-.294.404.294Zm2.864-2.273.205.456h.001l-.206-.456Zm8.034-.011-.21.454.003.001.207-.455Zm2.773 2.182-.402.297.001.002.4-.3Zm1.09 3.148v.5h.517l-.017-.517-.5.017Zm-2.23-.06c-.154-1.298-.788-2.323-1.881-3.04l-.549.836c.846.555 1.318 1.318 1.437 2.322l.993-.117Zm-1.881-3.04c-1.068-.7-2.357-1.037-3.843-1.037v1c1.333 0 2.422.3 3.294.873l.549-.836Zm-3.843-1.037c-1.083 0-2.055.175-2.902.541l.396.918c.697-.3 1.53-.459 2.506-.459v-1Zm-2.904.542c-.833.363-1.506.872-1.998 1.536l.804.595c.372-.503.896-.91 1.593-1.215l-.4-.916Zm-2 1.539a3.795 3.795 0 0 0-.732 2.283h1c0-.64.18-1.2.54-1.695l-.808-.588Zm-.732 2.283c0 .703.168 1.337.526 1.878l.834-.552c-.233-.353-.36-.787-.36-1.326h-1Zm.531 1.886c.344.497.78.911 1.305 1.242l.532-.847a3.432 3.432 0 0 1-1.013-.963l-.824.568Zm1.31 1.245c.498.305 1.02.558 1.566.759l.345-.94a7.806 7.806 0 0 1-1.389-.672l-.522.853Zm1.572.76c.525.186 1.012.338 1.46.456l.254-.967c-.416-.11-.876-.253-1.381-.431l-.333.943Zm1.457.455 2.364.637.26-.966-2.364-.636-.26.965Zm2.367.637c.585.154 1.242.368 1.973.644l.353-.936a21.107 21.107 0 0 0-2.073-.675l-.253.967Zm1.974.644a8.836 8.836 0 0 1 2.033 1.087l.58-.815a9.841 9.841 0 0 0-2.263-1.209l-.35.937Zm2.038 1.09a5.345 5.345 0 0 1 1.56 1.686l.859-.511a6.346 6.346 0 0 0-1.85-1.997l-.569.823Zm1.56 1.686c.39.656.6 1.483.6 2.506h1c0-1.159-.238-2.173-.741-3.017l-.86.511Zm.6 2.506c0 1.165-.304 2.206-.908 3.137l.839.544c.713-1.1 1.069-2.33 1.069-3.681h-1Zm-.91 3.139c-.593.925-1.47 1.674-2.657 2.239l.43.903c1.328-.632 2.36-1.497 3.07-2.602l-.843-.54Zm-2.658 2.24c-1.166.558-2.607.848-4.341.848v1c1.841 0 3.439-.308 4.773-.947l-.432-.902Zm-4.341.848c-1.614 0-2.986-.26-4.128-.764l-.404.915c1.298.572 2.813.85 4.532.85v-1Zm-4.127-.764c-1.141-.506-2.022-1.203-2.661-2.086l-.81.587c.754 1.041 1.782 1.844 3.066 2.413l.405-.914Zm-2.66-2.084c-.631-.881-.993-1.909-1.078-3.097l-.998.072c.097 1.357.516 2.564 1.263 3.607l.813-.582ZM7.818 25.5h2.91v-1h-2.91v1Zm2.411-.457c.084.97.415 1.805 1.012 2.472l.745-.667c-.433-.483-.693-1.104-.76-1.89l-.997.085Zm1.017 2.477c.583.634 1.313 1.101 2.179 1.406l.332-.943c-.726-.256-1.313-.637-1.775-1.14l-.736.677Zm2.184 1.408c.86.292 1.778.436 2.752.436v-1a7.507 7.507 0 0 1-2.43-.383l-.322.947Zm2.752.436c1.13 0 2.161-.184 3.086-.56l-.377-.926c-.787.32-1.688.486-2.71.486v1Zm3.09-.561c.922-.384 1.673-.924 2.233-1.628l-.783-.623c-.44.553-1.044.999-1.835 1.327l.385.924Zm2.235-1.63c.572-.73.857-1.582.857-2.537h-1c0 .743-.216 1.375-.643 1.919l.786.617Zm.857-2.537c0-.87-.246-1.625-.775-2.218l-.746.665c.335.376.52.879.52 1.553h1Zm-.775-2.218c-.488-.549-1.12-.982-1.88-1.31l-.395.92c.65.279 1.153.633 1.529 1.055l.746-.665Zm-1.88-1.31a18.388 18.388 0 0 0-2.348-.817l-.268.963c.8.222 1.539.48 2.22.773l.396-.918Zm-2.344-.816-2.864-.818-.275.961 2.864.819.275-.962Zm-2.863-.818c-1.767-.508-3.13-1.223-4.12-2.127l-.674.738c1.133 1.035 2.648 1.813 4.518 2.35l.276-.961Zm-4.12-2.127c-.946-.866-1.427-1.996-1.427-3.438h-1c0 1.694.579 3.102 1.753 4.176l.675-.738Zm-1.427-3.438c0-1.207.324-2.238.96-3.115l-.808-.588c-.772 1.063-1.152 2.304-1.152 3.703h1Zm.96-3.115c.657-.9 1.54-1.605 2.665-2.11l-.41-.913c-1.27.57-2.295 1.381-3.063 2.435l.808.588Zm2.666-2.111c1.133-.513 2.406-.774 3.828-.774v-1c-1.547 0-2.963.285-4.24.863l.412.91Zm3.828-.774c1.44 0 2.7.258 3.79.761l.42-.908c-1.243-.573-2.65-.853-4.21-.853v1Zm3.793.762c1.098.5 1.952 1.176 2.577 2.024l.805-.594c-.738-1-1.733-1.779-2.968-2.34l-.414.91Zm2.579 2.026c.627.84.957 1.79.992 2.865l1-.033a5.935 5.935 0 0 0-1.19-3.43l-.802.598Zm1.492 2.349h-2.727v1h2.727v-1Zm7.554 17.204-.263.425.003.002.26-.427Zm-2.807-3.136-.45.217.001.003.449-.22Zm0-9.432-.45-.217-.001.001.45.216Zm2.75-3.205.273.42v-.001l-.273-.419Zm6.83-.704.161-.473-.162.473Zm2.42 1.477-.342.365.002.002.34-.367Zm1.738 2.682.467-.18-.467.18Zm.648 5.25v.5h.5v-.5h-.5Zm-13.454 0h-.5v.5h.5v-.5Zm0-2.318v-.5h-.5v.5h.5Zm10.727 0v.5h.5v-.5h-.5Zm-.59-2.637-.448.224.002.003.445-.227Zm-1.66-1.83-.266.424.002.002.264-.425Zm-5.296.126.28.414h.002l-.282-.414Zm-1.784 2.045-.448-.222.448.222Zm.057 7.602-.448.223.003.004.445-.226Zm1.92 2.08-.251.432.003.002.249-.434Zm4.762.41.164.471h.003l-.167-.472Zm1.489-.91.347.36.003-.003-.35-.357Zm.966-1.523.135-.481-.442-.124-.162.43.469.175Zm2.59.727.478.149.152-.491-.494-.139-.136.482Zm-1.375 2.319.358.35.002-.003-.36-.347Zm-2.386 1.545.18.467.003-.001-.183-.466Zm-3.193.046c-1.607 0-2.964-.354-4.092-1.041l-.52.854c1.31.798 2.855 1.187 4.612 1.187v-1Zm-4.09-1.04c-1.127-.697-2-1.67-2.62-2.93l-.898.44c.699 1.421 1.697 2.54 2.993 3.341l.526-.85Zm-2.619-2.928c-.613-1.269-.927-2.76-.927-4.487h-1c0 1.849.337 3.494 1.027 4.922l.9-.435Zm-.927-4.487c0-1.727.314-3.226.928-4.512l-.902-.43c-.69 1.441-1.026 3.093-1.026 4.942h1Zm.928-4.51c.622-1.297 1.48-2.292 2.572-3.003l-.546-.838c-1.257.82-2.233 1.96-2.928 3.407l.902.433Zm2.573-3.003c1.09-.714 2.372-1.078 3.862-1.078v-1c-1.661 0-3.137.409-4.41 1.24l.548.838Zm3.862-1.078a7.77 7.77 0 0 1 2.532.428l.323-.946a8.774 8.774 0 0 0-2.855-.482v1Zm2.532.428a6.174 6.174 0 0 1 2.24 1.369l.684-.73a7.173 7.173 0 0 0-2.6-1.585l-.324.946Zm2.242 1.37c.661.614 1.202 1.44 1.612 2.497l.933-.362c-.454-1.17-1.072-2.132-1.865-2.868l-.68.734Zm1.612 2.497c.403 1.039.614 2.345.614 3.933h1c0-1.67-.22-3.107-.681-4.295l-.933.362Zm.614 3.933v1.136h1v-1.136h-1Zm.5.636H29.952v1h13.454v-1Zm-12.954.5v-2.318h-1v2.318h1Zm-.5-1.818h10.727v-1H29.952v1Zm11.227-.5c0-1.053-.211-2.012-.646-2.864l-.89.454c.353.694.536 1.493.536 2.41h1Zm-.644-2.86a4.952 4.952 0 0 0-1.842-2.031l-.528.85c.64.397 1.13.936 1.476 1.628l.894-.447Zm-1.84-2.03c-.804-.504-1.74-.747-2.789-.747v1c.89 0 1.636.204 2.257.594l.532-.847Zm-2.789-.747c-1.154 0-2.18.288-3.053.882l.562.827c.686-.466 1.51-.709 2.491-.709v-1Zm-3.053.882a5.732 5.732 0 0 0-1.952 2.237l.896.444a4.733 4.733 0 0 1 1.617-1.853l-.56-.828Zm-1.952 2.237a6.51 6.51 0 0 0-.677 2.927h1c0-.887.192-1.713.573-2.483l-.896-.444Zm-.677 2.927v1.545h1v-1.545h-1Zm0 1.545c0 1.374.237 2.572.734 3.575l.896-.445c-.412-.83-.63-1.867-.63-3.13h-1Zm.736 3.579c.503.988 1.207 1.756 2.115 2.285l.504-.864c-.73-.425-1.305-1.044-1.727-1.874l-.892.453Zm2.118 2.287c.904.519 1.943.77 3.101.77v-1c-1.01 0-1.872-.218-2.603-.638l-.498.868Zm3.101.77c.75 0 1.444-.104 2.073-.323l-.328-.944c-.507.176-1.087.267-1.745.267v1Zm2.076-.324a4.586 4.586 0 0 0 1.669-1.02l-.694-.72a3.58 3.58 0 0 1-1.31.798l.335.942Zm1.672-1.023a4.63 4.63 0 0 0 1.084-1.704l-.937-.351a3.63 3.63 0 0 1-.848 1.341l.701.714Zm.48-1.398 2.591.727.27-.963-2.59-.727-.27.963Zm2.249.097a5.246 5.246 0 0 1-1.257 2.12l.72.694a6.245 6.245 0 0 0 1.492-2.517l-.955-.297Zm-1.255 2.117c-.59.604-1.323 1.082-2.211 1.43l.365.93c1.006-.394 1.863-.946 2.561-1.66l-.715-.7Zm-2.208 1.428c-.881.339-1.883.513-3.014.513v1c1.233 0 2.36-.19 3.372-.579l-.358-.934ZM50.168 7.727h.5v-.5h-.5v.5Zm0 23.273v.5h.5V31h-.5Zm-2.682 0h-.5v.5h.5V31Zm0-23.273v-.5h-.5v.5h.5Zm2.182 0V31h1V7.727h-1Zm.5 22.773h-2.682v1h2.682v-1Zm-2.182.5V7.727h-1V31h1Zm-.5-22.773h2.682v-1h-2.682v1Zm10.275-.5h.5v-.5h-.5v.5Zm0 23.273v.5h.5V31h-.5Zm-2.681 0h-.5v.5h.5V31Zm0-23.273v-.5h-.5v.5h.5Zm2.181 0V31h1V7.727h-1Zm.5 22.773H55.08v1h2.681v-1Zm-2.181.5V7.727h-1V31h1Zm-.5-22.773h2.681v-1H55.08v1ZM65 0h21a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H65V0Z"/>
  <g filter="url(#a)">
    <path fill="red" d="M73.636 7.727V31h-2.818V7.727h2.818Zm12.878 5.819v2.272H77.47v-2.272h9.045Zm-6.409-4.182h2.682V26c0 .758.11 1.326.33 1.704.227.372.515.622.863.75.356.122.731.182 1.125.182.296 0 .538-.015.727-.045l.455-.091.545 2.41a5.443 5.443 0 0 1-.761.204c-.326.075-.739.113-1.239.113-.757 0-1.5-.163-2.227-.488a4.423 4.423 0 0 1-1.795-1.489c-.47-.667-.705-1.508-.705-2.523V9.364Z"/>
  </g>
  <defs>
    <filter id="a" width="24.014" height="35.5" x="66.818" y="3.727" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_34_15"/>
      <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend in2="effect1_backgroundBlur_34_15" result="effect2_dropShadow_34_15"/>
      <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_15" result="shape"/>
    </filter>
  </defs>
</svg>
        <form onSubmit={handleSubmit}>
         
    
         <div className="inputdiv">
         <input 
            className={`input ${inputActive ? 'active' : ''}`}
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {setName(e.target.value); handleInputChange(e)}}
            name="name"
          />
         </div>
       
         <div className="inputdiv">
          
          <input
             className={`input ${inputActive ? 'active' : ''}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>{ setEmail(e.target.value) ; handleInputChange(e)}}
            name="email"
          />
          </div>
          <div className="inputdiv">
          <input
            className={`input ${inputActive ? 'active' : ''}`}
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {setPhone(e.target.value); handleInputChange(e)}}
            name="phone"
          />
          </div>
         
          <div className="inputdiv"></div>
          <input
             className={`input ${inputActive ? 'active' : ''}`}
            type="password"
            value={password}
            placeholder="PassWord"
            onChange={(e) => {setPassword(e.target.value); handleInputChange(e)}}
            name="password"
          />
          <div/>
         
          <button id="btn">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
   
          </div>
     </div>
    </>
  );
}