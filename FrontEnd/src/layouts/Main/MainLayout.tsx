import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
    return (
        <div className={styles.mainLayout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
