import { useSelector } from 'react-redux';
import styles from './chart.module.scss';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import BasicDateCalendar from '@/components/Dashboard_views/calender/DateCalender';
import man from '../../../public/images/man.png'
import male from '../../../public/images/male.png'
import woman from '../../../public/images/woman.png'
import female from '../../../public/images/female.png'
import weight from '../../../public/images/weight.png'
import bmi from '../../../public/images/bmi1.jpg'
import Image from 'next/image';

function Charts(params) {



  const user = useSelector((state) => state.DietBarUser.userInfo)
  let height_m = user.height / 100
  const height_m2 = height_m * height_m
  const weight_kg = user.weight

  let BMI = weight_kg / height_m2
  BMI = BMI.toFixed(1)

  console.log(user);

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.bmiCalculator}>
          <div className={styles.firstrow}>
            <div className={styles.gw_container}>
              <div className={styles.gender}>
                <h1>Gender(<span>{user.gender}</span>)</h1>
                {user.gender == "male"? <Image src={male} width={0} height={0} />: <Image src={female} width={0} height={0} />}
              </div>
              <div className={styles.weight}>
                <h1>Weight (<span>{user.weight}kg</span>)</h1>
                <Image src={weight} width={100} height={100} />
              </div>
              <div className={styles.tribe}>
                <h1>Tribe</h1>
                <p>{user.tribe}</p>
              </div>
              <div className={styles.religion}>
                <h1>Religion</h1>
                <p>{user.religion}</p>
              </div>

            </div>
            <div className={styles.ho_container}>
              <div className={styles.height}>
                <h1>Height (<span>{user.height}cm</span>) </h1>
                {user.gender == 'male'? <Image src={man} width={0} height={0} />: <Image src={woman} width={0} height={0} /> }
              </div>
              <div className={styles.occupation}>
                <h1>Occupation</h1>
                <p>{user.occupation}</p>
              </div>
              <div className={styles.medical_condition}>
                <h1>Medical Condition</h1>
                <p>{user.medical_condition}</p>
              </div>
            </div>
          </div>
          <div className={ 
            BMI < 18.5? styles.bmiIndi + " " + styles.underweight:
            BMI >= 18.5? styles.bmiIndi + " " + styles.normal:
            BMI >= 25? styles.bmiIndi + " " + styles.overweight:
            BMI >= 30? styles.bmiIndi + " " + styles.obese:
            BMI >= 35? styles.bmiIndi + " " + styles.x_obese: styles.bmiIndi
            }>
              <Image src={bmi} width={100} height={100}/>
              <div>
            <h1>Body Mass Index</h1>
            <p>{BMI}Kg/m<sup>2</sup> <span>{
               BMI < 18.5? "Underweight":
               BMI >= 18.5? "Healthy Weight":
               BMI >= 25? "Overweight":
               BMI >= 30? "Obese":
               BMI >= 35? "Extremely Obese": null
              }</span> </p>
              </div>
          </div>

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
