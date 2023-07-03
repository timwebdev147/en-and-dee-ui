import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../styles/dashboard.module.scss";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut, BiPieChart } from "react-icons/bi";
import { BsChatDots, BsChatDotsFill, BsFillChatFill } from "react-icons/bs";
import { HiClipboardList, HiUserGroup } from "react-icons/hi";
import { TbNews } from "react-icons/tb";
import { FaBloggerB, FaPodcast } from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Chatbox from "@/components/Dashboard_views/private_chat/Chat";
import Charts from "@/components/Dashboard_views/charts/Charts";
import Podcast from "@/components/Dashboard_views/Podcast";
import Newsletter from "@/components/Dashboard_views/blog/Blog";
import Community from "@/components/Dashboard_views/community/Community";
import Recipe from "@/components/Dashboard_views/recipe/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { handleUserId, handleUserInfo } from "@/redux/dashboardSlice";

function Dashboard() {
  // const useSelector =s
  const [request, setRequest] = useState("charts");
  const [loggged, setLogged] = useState("false");
  const user = useSelector((state) => state.DietBarUser.userInfo);
  let Router = useRouter();
  let dispatch = useDispatch();

  useEffect(() => {
    let isLoggedIn = window.localStorage.getItem("isLoggedIn");
    setLogged(isLoggedIn);
    if (
      isLoggedIn == "false" ||
      isLoggedIn == undefined ||
      isLoggedIn == null ||
      !isLoggedIn
    ) {
      Router.push("/");
    }
  }, []);

  function logout() {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("token", null);
    dispatch(handleUserInfo([]));
    dispatch(handleUserId(""));
    Router.push("/");
  }

  if (loggged == "false") {
    return (
      <>
        <div>welcomee</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Nutrition and Dietetics</title>
        <meta
          name="description"
          content="Cleaning service in Cape Coral, Florida"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconND.ico" />
      </Head>
      <ToastContainer />
      <div className={styles.dashboard}>
        <div className={styles.dash_nav}>
          <Image className={styles.logo} src={logo} />
          <p>
            <RxDashboard className={styles.nav_icon} /> Dashboard
          </p>
          <p
            onClick={() => setRequest("chat")}
            className={request == "chat" ? styles.active_icon : null}
          >
            <BsChatDotsFill className={styles.nav_icon} />
            {user.role != "admin" ? "Chat with Dietician" : "chat with Users"}
          </p>
          <p
            onClick={() => setRequest("charts")}
            className={request == "charts" ? styles.active_icon : null}
          >
            <BiPieChart className={styles.nav_icon} /> Health Charts
          </p>
          <p
            onClick={() => setRequest("podcast")}
            className={request == "podcast" ? styles.active_icon : null}
          >
            <FaPodcast className={styles.nav_icon} /> Podcast
          </p>
          <p
            onClick={() => setRequest("blog")}
            className={request == "blog" ? styles.active_icon : null}
          >
            <FaBloggerB className={styles.nav_icon} /> Blog
          </p>
          <p
            onClick={() => setRequest("community")}
            className={request == "community" ? styles.active_icon : null}
          >
            <HiUserGroup className={styles.nav_icon} /> Community
          </p>
          <p
            onClick={() => setRequest("recipe")}
            className={request == "recipe" ? styles.active_icon : null}
          >
            <HiClipboardList className={styles.nav_icon} /> Recipe
          </p>
          <p onClick={() => logout()} className={styles.logout}>
            <BiLogOut className={styles.nav_icon} /> Logout
          </p>
        </div>
        <div className={styles.dash_view}>
          {request == "chat" ? (
            <Chatbox />
          ) : request == "charts" ? (
            <Charts />
          ) : request == "podcast" ? (
            <Podcast />
          ) : request == "blog" ? (
            <Newsletter />
          ) : request == "community" ? (
            <Community />
          ) : request == "recipe" ? (
            <Recipe />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
