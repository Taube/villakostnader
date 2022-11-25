import { Hero } from "./Hero"
import { useTranslation } from "react-i18next"

export const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Hero title={t("home.title")}>{t("home.description")}</Hero>
    </>
  )
}
