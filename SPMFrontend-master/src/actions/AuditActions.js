import { AuditType } from './ActionType';

export function insertIntoAudit(data) {
  return {
    type: AuditType.INSERT_INTO_AUDIT,
    data
  };
}

export function auditForPersonalInfo(data) {
  return {
    type: AuditType.INSERT_INTO_AUDIT_FOR_PERSONAL_INFO,
    data
  };
}

export function updateAuditData(data) {
  return {
    type: AuditType.UPDATE_AUDIT_DATA,
    data
  };
}

export function updateAuditForCompensatonInfo(data) {
  return {
    type: AuditType.AUDIT_UPDATE_FOR_COMPENSATION,
    data
  };
}

export function updateWorkerAuditData(data) {
  return {
    type: AuditType.UPDATE_WORKER_AUDIT_DATA,
    data
  };
}
export function insertAuditForBenefits(data) {
  return {
    type: AuditType.INSERT_AUDIT_FOR_BENEFITS,
    data
  };
}

export function insertIntoLeavesAudit(data) {
  return {
    type: AuditType.INSERT_INTO_LEAVES_AUDIT,
    data
  };
}

export function updateLeavesAuditData(data) {
  return {
    type: AuditType.UPDATE_LEAVES_AUDIT,
    data
  };
}

export function updatePublicHolidaysAuditData(data) {
  return {
    type: AuditType.UPDATE_PUBLIC_HOLIDAYS_AUDIT,
    data
  };
}

export function updatePerformanceManagementAuditData(data) {
  return {
    type: AuditType.UPDATE_PERFORMANCE_MANAGEMENT_AUDIT,
    data
  };
}
