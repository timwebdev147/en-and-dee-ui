import { useSelector } from 'react-redux';
import styles from './chart.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import BasicDateCalendar from '@/components/Dashboard_views/calender/DateCalender';

function Charts(params) {



  const user = useSelector((state) => state.DietBarUser.userInfo)
  console.log(user);

  return (
    <>
      <div className={styles.mainDiv}>
        <div>

        </div>
        <div className={styles.userDetails}>
          <h1>My profile</h1>
          <div className={styles.imageContainer}>
            <div><img src="" alt="image" /></div>
            <p>{user.fullName? user.fullName: "-------"}</p>
            <span>@{user.username? user.username: "-------"}</span>
          </div>
          <div className={styles.info_row} >
              <div>
                <span>weight</span>
                <p>{user.weight? user.weight: "--"}kg</p>
              </div>
              <div>
                <span>height</span>
                <p>{user.height? user.height: "---"}cm</p>
              </div>
              <div>
                <span>age</span>
                <p>{user.age? user.age: "--"}</p>
              </div>
          </div>
          <div className={styles.calenderHolder}>
            <BasicDateCalendar className={styles.dateCalender} />
          </div>

        </div>
      </div>
    </>
  );
}

export default Charts;
