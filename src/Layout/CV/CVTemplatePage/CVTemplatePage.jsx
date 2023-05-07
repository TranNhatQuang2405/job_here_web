import React, { useRef } from 'react'
import { CVBody } from 'Components/CV'
import "./CVTemplatePage.css"
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
function CVTemplatePage() {
    const { t } = useTranslation()
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <div>
            <div className="CVTemplatePage__btn">
                <ButtonPrimary secondary={true}>{t("cvTemplate.btn.close")}</ButtonPrimary>
                <ButtonPrimary onClick={handlePrint}>{t("cvTemplate.btn.useTemplate")}</ButtonPrimary>
            </div>
            <CVBody ref={componentRef}></CVBody>
        </div>

    )
}

export default CVTemplatePage