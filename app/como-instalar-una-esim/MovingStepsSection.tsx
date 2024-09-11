import React from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import InstallationSteps from './InstallationSteps'
import SwitchingPhoneContainer from './SwitchingPhoneContainer'

type Props = {
    sectionTitle: string;
    sectionHeader: string;
    isInstallOrActivateSteps: 'install' | 'activate';
}

const MovingStepsSection: React.FC<Props> = ({ sectionTitle, sectionHeader, isInstallOrActivateSteps }) => {
    return (
        <div className='flex flex-col space-y-48 p-24 sm:p-64'>
            <SectionHeader title={sectionTitle} header={sectionHeader} />
            <div className='flex flex-col md:flex-row space-y-12 space-x-0 md:space-y-0 md:space-x-48'>      
                <InstallationSteps 
                    isInstallOrActivateSteps={isInstallOrActivateSteps}
                />
                <SwitchingPhoneContainer 
                    isInstallOrActivateSteps={isInstallOrActivateSteps} 
                />
            </div>
        </div>
    )
}

export default MovingStepsSection