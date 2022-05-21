import subDays from 'date-fns/subDays';
import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const TopDayPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtDay = new Date(subDays(now, 1)).toISOString();

  return (
    <MainLayout streams>
      <Clips
        title="Топ за день"
        description="Клипы за 24 часа с самым высоким рейтингом"
        titleLink="/top/day"
        startedAt={startedAtDay}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </MainLayout>
  );
};

export default TopDayPage;
