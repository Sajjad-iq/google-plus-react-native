import { useTranslation } from "react-i18next";

export default function useTimeAgo() {

    const { t } = useTranslation();

    function timeAgo(postDate: string): string {
        const currentDate = new Date();
        const postDateObj = new Date(postDate);

        const differenceInMilliseconds = currentDate.getTime() - postDateObj.getTime();
        const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

        if (differenceInMinutes < 1) return `0 ${t('post.postTimer.m')}`;
        if (differenceInMinutes < 60) return `${differenceInMinutes} ${t('post.postTimer.m')}`;

        const differenceInHours = Math.floor(differenceInMinutes / 60);
        if (differenceInHours < 24) return `${differenceInHours} ${t('post.postTimer.h')}`;

        const differenceInDays = Math.floor(differenceInHours / 24);
        if (differenceInDays < 7) return `${differenceInDays} ${t('post.postTimer.d')}`;

        const differenceInWeeks = Math.floor(differenceInDays / 7);
        if (differenceInWeeks < 4) return `${differenceInWeeks} ${t('post.postTimer.w')}`;

        const differenceInMonths = Math.floor(differenceInDays / 30);
        if (differenceInMonths < 12) return `${differenceInMonths} ${t('post.postTimer.mon')}`;

        const differenceInYears = Math.floor(differenceInMonths / 12);
        return `${differenceInYears} ${t('post.postTimer.y')} ago`;
    }
    return {
        timeAgo
    }
}

