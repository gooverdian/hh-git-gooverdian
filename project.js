import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from 'bloko/blocks/drop';
import Button from 'bloko/blocks/button';
import Link from 'bloko/blocks/link';

import { MODAL_ARCHIVE, ADD_MODAL } from 'lux/pages/EmployerVacancies/components/Modals';
import translation from 'lux/components/translation';

const ArchiveTrigger = ({
    trls,
    shouldShowTrigger,
    vacanciesIds,
    dispatchModal,
    checkedVacancies,
    triggerType,
    onClose,
}) => {
    const openModal = useCallback(
        () => {
            dispatchModal({
                type: ADD_MODAL,
                payload: {
                    modalType: MODAL_ARCHIVE,
                    data: { vacanciesIds, checkedVacancies },
                },
            });
            onClose && onClose();
        },
        [vacanciesIds, checkedVacancies, onClose, dispatchModal]
    );

    if (!shouldShowTrigger) {
        return null;
    }

    if (triggerType === 'menu') {
        return (
            <MenuItem onClick={openModal} data-qa="vacancy-action-archive-dropdown">
                <span className="bloko-button__content">{trls[ArchiveTrigger.trls.archive]}</span>
            </MenuItem>
        );
    }

    if (triggerType === 'link') {
        return (
            <Link kind="notify" data-qa="vacancy-action-archive" onClick={openModal}>
                {trls[ArchiveTrigger.trls.archive]}
            </Link>
        );
    }

    let triggerProps = {};

    if (triggerType === 'short') {
        triggerProps = { scale: 'small', 'data-action': 'archive' };
    }

    return (
        <Button {...triggerProps} data-qa="vacancy-action-archive" onClick={openModal}>
            <span className="bloko-button__content">{trls[ArchiveTrigger.trls.archive]}</span>
        </Button>
    );
};

ArchiveTrigger.trls = {
    archive: 'employer.myVacancyes.archivate',
};

ArchiveTrigger.propTypes = {
    trls: PropTypes.object,
    permissions: PropTypes.array,
    dispatchModal: PropTypes.func,
    vacanciesIds: PropTypes.arrayOf(PropTypes.number),
    shouldShowTrigger: PropTypes.bool,
    triggerType: PropTypes.string,
    onClose: PropTypes.func,
    checkedVacancies: PropTypes.object,
};

export default translation(ArchiveTrigger);
