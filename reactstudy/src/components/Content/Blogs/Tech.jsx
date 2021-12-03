import React from "react";
import TechItem from "./TechItem/TechItem";
import TechTitleEnum from "./TechItem/TechItemEnum";

const Tech = () => {
    return (
        <div className={'tech_contaiter'}>
            <div className={'tech_description'}>
                <h2 className={'tech_description_title'}>Эта вкладка для понимания моего стека:</h2>
                <p>В данном разделе я указал только текущий (рабочий) стэк технологий, с которым я сталкиваюсь каждый
                    день, при этом хочется добавить, что большой вклад в понимание ниже указанных языков/технологий
                    привнес <span className={'tech_description_important'}>Java</span>.</p>
                <p>Так же хочется поблагодарить ресурсы такие как: {' '}
                    <a className={'tech_description_link'} href="https://learn.javascript.ru/">learn.javascript.ru</a>, {' '}
                    <a className={'tech_description_link'} href="https://learn-reactjs.ru/tutorial/">learn-reactjs.ru</a> {' '}
                    , тонне технической документации от  {' '}
                    <a className={'tech_description_link'} href="https://developer.mozilla.org/ru/">developer.mozilla.org</a> {' '}
                    и команд разработчиков на <a target={'_blank'} className={'tech_description_link'} href="https://github.com/">github.com</a> .
                </p>
                <p>На конец 2021 года активно изучаю технологии backend такие как, <span className={'tech_description_important'}>Java</span>{' '},{' '}
                    <span className={'tech_description_important'}>NodeJS</span>{' '},{' '}
                    <span className={'tech_description_important'}>ExpressJS</span>{' '},{' '}
                    <span className={'tech_description_important'}>NextJS</span>{' '},{' '}
                    <span className={'tech_description_important'}>RestJS</span></p>
                <p>Пока нет мыслей чем продолжить, но если буду релизить - то обязательно напишу больше строк и ресурсов.</p>
            </div>

            <div className={'tech_legend'}>
                <span className={'tech_legend_applied'}>APPLIED</span>
                <span className={'tech_legend_instack'}>IN STACK</span>
                <span className={'tech_legend_notused'}>NOT USED</span>
            </div>

            <div className={'tech_used_container'}>
                <TechItem type={TechTitleEnum.html} active={true}/>
                <TechItem type={TechTitleEnum.css} active={true}/>
                <TechItem type={TechTitleEnum.js} active={true}/>
                <TechItem type={TechTitleEnum.ts} active={true}/>
                <TechItem type={TechTitleEnum.npm} active={true}/>
                <TechItem type={TechTitleEnum.nodejs} active={false} notUsed={true}/>
                <TechItem type={TechTitleEnum.enzyme} active={false}/>
                <TechItem type={TechTitleEnum.jest} active={false} notUsed={true}/>
                <TechItem type={TechTitleEnum.react} active={true}/>
                <TechItem type={TechTitleEnum.reactHook} active={true}/>
                <TechItem type={TechTitleEnum.reactRoute} active={true}/>
                <TechItem type={TechTitleEnum.redux} active={false}/>
                <TechItem type={TechTitleEnum.webpack} active={true}/>
                <TechItem type={TechTitleEnum.docker} active={false} notUsed={true}/>
                <TechItem type={TechTitleEnum.reactNative} active={false} notUsed={true}/>
                <TechItem type={TechTitleEnum.prettier} active={true}/>
                <TechItem type={TechTitleEnum.mobx} active={false} notUsed={true}/>
                <TechItem type={TechTitleEnum.mongodb} active={false}/>
                <TechItem type={TechTitleEnum.sql} active={false} notUsed={true}/>
            </div>
        </div>
    )
}

export default Tech;