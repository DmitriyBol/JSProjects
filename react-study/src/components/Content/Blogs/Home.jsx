import React from "react";
import {Link} from "react-router-dom";
import HomeImage from '../../../../static/img/footer-home.png'

const Home = () => {
    const data = new Date().getFullYear()
    const currentAge = data - 1989;
    const ageDec = declOfNum(currentAge, ['год', 'года', "лет"])

    function declOfNum(n, text_forms) {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 == 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    return (
        <div className='home_container'>
            <h1 className='home_container-greetings'>Hello, {' '}<span className='home_container-greetings-curvie'> strangers !</span>
            </h1>
            <div className='home_container-text'>
                <p className='indent-20'>Привет! Меня зовут Большаков Дмитрий, мне {currentAge} {ageDec}. Примерно в 30
                    лет я решил полностью
                    сменить свой профиль и решил попробовать свои силы в программировании.</p>
                <p className='indent-20'>Ранее я работал в сфере финансов, логистики и "критическим" бюджетированием.
                    Терпения мне не занимать
                    и в мире мало вещей, которые смогут меня удивить. Моя главная мысль, а может и девиз, это то - что
                    не бывает не решаемых проблем, а фундаментальное понятие критического мышления и идеологии -
                    позволяет спокойно подходить к решению любой проблемы.</p>
                <p className='indent-20'>С уверенностью могу сказать, что за все свое время обучения - я ни разу не
                    пожалел о своем
                    выборе.</p>
                <p className='important-text'>Меньше воды, ниже важное:</p>
                <ul className='home_container-list'>
                    <li>Образование: УрГАХА 5 курсов 2007-2013 Факультет: Графический дизайн.</li>
                    <li>В период 2015 и 2020 я работал в сфере логистики и критического бюджетирования.</li>
                    <li>Вариативность задач, как и места работы - радиально разбросаны по сфере.</li>
                    <li>Очень развито чувство прекрасного, выполненного и доведенного до конца.</li>
                    <li>Английский на уровне чтения технической документации. Понятна и устная речь.</li>
                    <li>Начиная с 2021 года работаю Junior Frontend Developer'ом, стек на вкладе <Link to='/tech'><span
                        className='important-text'>Технологии</span></Link>.
                    </li>
                </ul>
                <p className='important-text-less'>Ниже не так важно, но вдруг: </p>
                <ul className='home_container-addinfo'>
                    <li>Район обитания порой славный, а порой не очень, город Екатеринбург.</li>
                    <li>Гражданин РФ.</li>
                    <li>Женат на чудесном человеке.</li>
                    <li>2 кота и еще 3 на воспитании у родителей.</li>
                    <li>Увлекаюсь настолками, играми, хорошей музыкой (ритм 70-80, Sythwave и частные песни 90-10х годов).</li>
                    <li>В розысках не состою, кредитами не балуюсь, ипотекой довольствуюсь.</li>
                </ul>
                <p>Спасибо за внимание, если чтото упустил, буду рад ответить. У вас ведь есть мои <Link to='/contacts'><span
                    className='important-text'>контакты</span></Link>?</p>
                <h1 className='home_container-greetings'><span className='home_container-greetings-curvie'> See You</span>{' '} later !</h1>
                <img className='home-footer-img' src={HomeImage} alt="12"/>
            </div>
        </div>
    )
}

export default Home;