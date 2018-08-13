# spmapi v0.0.0



- [Actualspent](#actualspent)
	- [Create actualspent](#create-actualspent)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [ChatBot](#chatbot)
	- [Send Message](#send-message)
	
- [Company](#company)
	- [Create company](#create-company)
	- [Delete company](#delete-company)
	- [Retrieve companies](#retrieve-companies)
	- [Retrieve company](#retrieve-company)
	- [Update company](#update-company)
	
- [CompensationPlanStatus](#compensationplanstatus)
	- [Retrieve CompensationPlanStatus](#retrieve-compensationplanstatus)
	
- [Compensationplan](#compensationplan)
	- [Create compensationplan](#create-compensationplan)
	- [Delete compensationplan](#delete-compensationplan)
	- [Retrieve compensationplan](#retrieve-compensationplan)
	- [Retrieve compensationplans](#retrieve-compensationplans)
	- [Update compensationplan](#update-compensationplan)
	
- [Countries](#countries)
	- [Create countries](#create-countries)
	- [Delete countries](#delete-countries)
	- [Retrieve countries](#retrieve-countries)
	- [Retrieve country](#retrieve-country)
	
- [Employee](#employee)
	- [Create employee](#create-employee)
	- [Delete employee](#delete-employee)
	- [Retrieve employee](#retrieve-employee)
	- [Retrieve employees](#retrieve-employees)
	- [Update employee](#update-employee)
	
- [HRQueries](#hrqueries)
	- [Create hrQueries](#create-hrqueries)
	- [Create hrQueries](#create-hrqueries)
	
- [Leaves](#leaves)
	- [Create leavesMaster](#create-leavesmaster)
	- [Create Leaves Audit](#create-leaves-audit)
	- [Delete leavesMaster](#delete-leavesmaster)
	- [Retrieve leavesMaster](#retrieve-leavesmaster)
	- [Retrieve Leaves Audit](#retrieve-leaves-audit)
	- [Update leavesMaster](#update-leavesmaster)
	
- [Maste](#maste)
	- [Update mastertype](#update-mastertype)
	
- [Master](#master)
	- [Create master](#create-master)
	- [Retrieve master](#retrieve-master)
	
- [MasterValue](#mastervalue)
	- [Create mastervalues](#create-mastervalues)
	
- [Mastertype](#mastertype)
	- [Delete mastertype](#delete-mastertype)
	
- [Mastervalues](#mastervalues)
	- [Delete mastervalues](#delete-mastervalues)
	
- [Meritgroup](#meritgroup)
	- [Create meritgroup](#create-meritgroup)
	- [Delete meritgroup](#delete-meritgroup)
	- [Retrieve meritgroup](#retrieve-meritgroup)
	- [Retrieve meritgroups](#retrieve-meritgroups)
	- [Update meritgroup](#update-meritgroup)
	
- [MyEmployees](#myemployees)
	- [Retrieve myEmployees](#retrieve-myemployees)
	
- [OrgHierarchy](#orghierarchy)
	- [Create OrgHierarchy](#create-orghierarchy)
	- [Retrieve OrgHierarchy](#retrieve-orghierarchy)
	
- [OrgchartView](#orgchartview)
	- [Retrieve OrgchartView](#retrieve-orgchartview)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [ProductionSupport](#productionsupport)
	- [Create productionSupport](#create-productionsupport)
	- [Create productionSupport](#create-productionsupport)
	
- [Registration](#registration)
	- [Create Registration](#create-registration)
	- [Retrieve Registrations](#retrieve-registrations)
	
- [Retiralbenifits](#retiralbenifits)
	- [Create retiralbenifits](#create-retiralbenifits)
	- [Delete retiralbenifits](#delete-retiralbenifits)
	- [Retrieve retiralbenifits](#retrieve-retiralbenifits)
	- [Retrieve retiralbenifits by country](#retrieve-retiralbenifits-by-country)
	- [Update retiralbenifits](#update-retiralbenifits)
	
- [Role](#role)
	- [Create role](#create-role)
	- [Delete role](#delete-role)
	- [Retrieve role](#retrieve-role)
	- [Retrieve roles](#retrieve-roles)
	- [Update role](#update-role)
	
- [Salaryband](#salaryband)
	- [Create salaryband](#create-salaryband)
	- [Delete Salaryband](#delete-salaryband)
	- [Retrieve Salaryband](#retrieve-salaryband)
	- [Create Salaryband](#create-salaryband)
	
- [Swisscontons](#swisscontons)
	- [Create swisscontons](#create-swisscontons)
	- [Delete swisscontons](#delete-swisscontons)
	- [Retrieve swisscontons](#retrieve-swisscontons)
	- [Update swisscontons](#update-swisscontons)
	
- [Swisspayroll](#swisspayroll)
	- [Create swisspayroll](#create-swisspayroll)
	- [Delete swisspayroll](#delete-swisspayroll)
	- [Retrieve swisspayroll](#retrieve-swisspayroll)
	- [Retrieve swisspayrolls](#retrieve-swisspayrolls)
	- [Update swisspayroll](#update-swisspayroll)
	
- [Swizzdeductions](#swizzdeductions)
	- [Create swizzdeductions](#create-swizzdeductions)
	- [Delete swizzdeductions](#delete-swizzdeductions)
	- [Retrieve swizzdeductions](#retrieve-swizzdeductions)
	- [Update swizzdeductions](#update-swizzdeductions)
	
- [Taxbenifit](#taxbenifit)
	- [Create taxbenifit](#create-taxbenifit)
	- [Delete taxbenifit](#delete-taxbenifit)
	- [Retrieve taxbenifit](#retrieve-taxbenifit)
	- [Retrieve taxbenifits](#retrieve-taxbenifits)
	- [Update taxbenifit](#update-taxbenifit)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	
- [_Users_Prajith_Office_Projects_SPMAPI_src_api_orgchart_index_js](#_users_prajith_office_projects_spmapi_src_api_orgchart_index_js)
	- [Create orgchart](#create-orgchart)
	
- [actualspent](#actualspent)
	- [Delete actualspent](#delete-actualspent)
	- [Retrieve actualspent](#retrieve-actualspent)
	
- [employee](#employee)
	- [Create employee](#create-employee)
	- [Delete employee](#delete-employee)
	- [Retrieve employee](#retrieve-employee)
	- [Create employee](#create-employee)
	
- [nominationPlan](#nominationplan)
	- [Create nominationPlan](#create-nominationplan)
	


# Actualspent

## Create actualspent



	POST /actualspent


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| actualspent			| 			|  <p>Actualspent's actualspent.</p>							|
| budgetallocated			| 			|  <p>Actualspent's budgetallocated.</p>							|
| rating			| 			|  <p>Actualspent's rating.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# ChatBot

## Send Message



	POST /chatbot


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| message			| 			|  <p>Message.</p>							|

# Company

## Create company



	POST /companies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Company's name.</p>							|
| address			| 			|  <p>Company's address.</p>							|
| website			| 			|  <p>Company's website.</p>							|

## Delete company



	DELETE /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve companies



	GET /companies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve company



	GET /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Update company



	PUT /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Company's name.</p>							|
| address			| 			|  <p>Company's address.</p>							|
| website			| 			|  <p>Company's website.</p>							|

# CompensationPlanStatus

## Retrieve CompensationPlanStatus



	GET /CompensationPlanStatus


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Compensationplan

## Create compensationplan



	POST /compensationplans


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Compensationplan's name.</p>							|
| jobtitle			| 			|  <p>Compensationplan's jobtitle.</p>							|
| reviewrating			| 			|  <p>Compensationplan's reviewrating.</p>							|
| prerating			| 			|  <p>Compensationplan's prerating.</p>							|
| currencycode			| 			|  <p>Compensationplan's currencycode.</p>							|
| currentsalary			| 			|  <p>Compensationplan's currentsalary.</p>							|
| increasedate			| 			|  <p>Compensationplan's increasedate.</p>							|
| compratio			| 			|  <p>Compensationplan's compratio.</p>							|
| min			| 			|  <p>Compensationplan's min.</p>							|
| max			| 			|  <p>Compensationplan's max.</p>							|
| merit			| 			|  <p>Compensationplan's merit.</p>							|
| lumpsum			| 			|  <p>Compensationplan's lumpsum.</p>							|
| adjustment			| 			|  <p>Compensationplan's adjustment.</p>							|
| promotion			| 			|  <p>Compensationplan's promotion.</p>							|
| paygrade			| 			|  <p>Compensationplan's paygrade.</p>							|
| effectivedate			| 			|  <p>Compensationplan's effectivedate.</p>							|

## Delete compensationplan



	DELETE /compensationplans/:id


## Retrieve compensationplan



	GET /compensationplans/:id


## Retrieve compensationplans



	GET /compensationplans


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update compensationplan



	PUT /compensationplans/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Compensationplan's name.</p>							|
| jobtitle			| 			|  <p>Compensationplan's jobtitle.</p>							|
| reviewrating			| 			|  <p>Compensationplan's reviewrating.</p>							|
| prerating			| 			|  <p>Compensationplan's prerating.</p>							|
| currencycode			| 			|  <p>Compensationplan's currencycode.</p>							|
| currentsalary			| 			|  <p>Compensationplan's currentsalary.</p>							|
| increasedate			| 			|  <p>Compensationplan's increasedate.</p>							|
| compratio			| 			|  <p>Compensationplan's compratio.</p>							|
| min			| 			|  <p>Compensationplan's min.</p>							|
| max			| 			|  <p>Compensationplan's max.</p>							|
| merit			| 			|  <p>Compensationplan's merit.</p>							|
| lumpsum			| 			|  <p>Compensationplan's lumpsum.</p>							|
| adjustment			| 			|  <p>Compensationplan's adjustment.</p>							|
| promotion			| 			|  <p>Compensationplan's promotion.</p>							|
| paygrade			| 			|  <p>Compensationplan's paygrade.</p>							|
| effectivedate			| 			|  <p>Compensationplan's effectivedate.</p>							|

# Countries

## Create countries



	POST /countries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| countryName			| 			|  <p>Country's name.</p>							|
| status			| 			|  <p>Country's status.</p>							|

## Delete countries



	DELETE /countries/:id


## Retrieve countries



	GET /countries/:id


## Retrieve country



	GET /employeetargets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Employee

## Create employee



	POST /employees


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| employee			| Object			|  <p>Employee's FirstName.</p>							|

## Delete employee



	DELETE /employees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve employee



	GET /employees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve employees



	GET /employees/updateNewEmployee


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update employee



	PUT /employees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| identify			| Object			|  <p>Employee's FirstName.</p>							|
| personalInformation			| Object			|  <p>Employee's LastName.</p>							|
| jobInformation			| Object			|  <p>Employee's MiddleName.</p>							|
| compensationInformation			| Object			|  <p>Employee's Sufix.</p>							|

# HRQueries

## Create hrQueries



	POST /hrQueries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| issueType			| 			|  <p>issueType's name.</p>							|
| requestDate.			| 			|  							|
| subject.			| 			|  							|
| issueDesc.			| 			|  							|
| filePath.			| 			|  							|
| notification.			| 			|  							|
| status.			| 			|  							|
| approvalDate			| 			|  							|
| approvedBy			| 			|  							|
| createdBy			| 			|  							|
| comments			| 			|  							|

## Create hrQueries



	GET /hrQueries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| issueType			| 			|  <p>issueType's name.</p>							|
| requestDate.			| 			|  							|
| subject.			| 			|  							|
| issueDesc.			| 			|  							|
| filePath.			| 			|  							|
| notification.			| 			|  							|
| status.			| 			|  							|
| approvalDate			| 			|  							|
| approvedBy			| 			|  							|
| createdBy			| 			|  							|
| comments			| 			|  							|

# Leaves

## Create leavesMaster



	POST /leavesMaster


## Create Leaves Audit



	POST /leavesAudit


## Delete leavesMaster



	DELETE /leavesMaster/:id


## Retrieve leavesMaster



	GET /leavesMaster


## Retrieve Leaves Audit



	GET /leavesAudit


## Update leavesMaster



	PUT /leavesMaster/:id


# Maste

## Update mastertype



	PUT /master/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# Master

## Create master



	POST /master


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve master



	GET /master/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# MasterValue

## Create mastervalues



	POST /mastervalues


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# Mastertype

## Delete mastertype



	DELETE /master/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# Mastervalues

## Delete mastervalues



	DELETE /mastervalues/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# Meritgroup

## Create meritgroup



	POST /meritgroups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Meritgroup's name.</p>							|
| min			| 			|  <p>Meritgroup's min.</p>							|
| max			| 			|  <p>Meritgroup's max.</p>							|

## Delete meritgroup



	DELETE /meritgroups/:id


## Retrieve meritgroup



	GET /meritgroups/:id


## Retrieve meritgroups



	GET /meritgroups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update meritgroup



	PUT /meritgroups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Meritgroup's name.</p>							|
| min			| 			|  <p>Meritgroup's min.</p>							|
| max			| 			|  <p>Meritgroup's max.</p>							|

# MyEmployees

## Retrieve myEmployees



	GET /employees/myEmployees


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

# OrgHierarchy

## Create OrgHierarchy



	POST /OrgHierarchy


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| employeeid			| 			|  <p>employeeid's.</p>							|
| cpm_manager			| 			|  <p>cpm_manager's status.</p>							|

## Retrieve OrgHierarchy



	GET /OrgHierarchy


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# OrgchartView

## Retrieve OrgchartView



	GET /OrgchartView


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# ProductionSupport

## Create productionSupport



	POST /productionSupport


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| issueType			| 			|  <p>issueType's name.</p>							|
| requestDate.			| 			|  							|
| subject.			| 			|  							|
| issueDesc.			| 			|  							|
| filePath.			| 			|  							|
| notification.			| 			|  							|
| status.			| 			|  							|
| approvalDate			| 			|  							|
| approvedBy			| 			|  							|
| createdBy			| 			|  							|
| comments			| 			|  							|

## Create productionSupport



	GET /productionSupport/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| issueType			| 			|  <p>issueType's name.</p>							|
| requestDate.			| 			|  							|
| subject.			| 			|  							|
| issueDesc.			| 			|  							|
| filePath.			| 			|  							|
| notification.			| 			|  							|
| status.			| 			|  							|
| approvalDate			| 			|  							|
| approvedBy			| 			|  							|
| createdBy			| 			|  							|
| comments			| 			|  							|

# Registration

## Create Registration



	POST /Registration


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| userName			| 			|  <p>userName's name.</p>							|
| emailId.			| 			|  							|
| password.			| 			|  							|
| confirmPassword.			| 			|  							|
| firstName.			| 			|  							|
| lastName.			| 			|  							|
| gender.			| 			|  							|

## Retrieve Registrations



	GET /Registrations


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Retiralbenifits

## Create retiralbenifits



	POST /retiralbenifits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Retiralbenifits's name.</p>							|
| country			| 			|  <p>Retiralbenifits's country.</p>							|
| company			| 			|  <p>Retiralbenifits's company.</p>							|
| region			| 			|  <p>Retiralbenifits's region.</p>							|

## Delete retiralbenifits



	DELETE /retiralbenifits/:id


## Retrieve retiralbenifits



	GET /retiralbenifits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve retiralbenifits by country



	GET /retiralbenifits/county/:country


## Update retiralbenifits



	PUT /retiralbenifits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Retiralbenifits's name.</p>							|
| country			| 			|  <p>Retiralbenifits's country.</p>							|
| company			| 			|  <p>Retiralbenifits's company.</p>							|
| region			| 			|  <p>Retiralbenifits's region.</p>							|

# Role

## Create role



	POST /roles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Role's name.</p>							|

## Delete role



	DELETE /roles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve role



	GET /roles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve roles



	GET /roles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update role



	PUT /roles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Role's name.</p>							|

# Salaryband

## Create salaryband



	POST /salaryband


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| bandname			| 			|  <p>Salaryband's bandname.</p>							|
| bandcode			| 			|  <p>Salaryband's bandcode.</p>							|

## Delete Salaryband



	DELETE /Salaryband/:id


## Retrieve Salaryband



	GET /Salaryband/:id


## Create Salaryband



	PUT /Salaryband


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| bandname			| 			|  <p>Salaryband's bandname.</p>							|
| bandcode			| 			|  <p>Salaryband's bandcode.</p>							|

# Swisscontons

## Create swisscontons



	POST /swisscontons


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Swisscontons's name.</p>							|
| code			| 			|  <p>Swisscontons's code.</p>							|

## Delete swisscontons



	DELETE /swisscontons/:id


## Retrieve swisscontons



	GET /swisscontons


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update swisscontons



	PUT /swisscontons/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Swisscontons's name.</p>							|
| code			| 			|  <p>Swisscontons's code.</p>							|

# Swisspayroll

## Create swisspayroll



	POST /swisspayrolls


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| company			| 			|  <p>Swisspayroll's company.</p>							|
| employee			| 			|  <p>Swisspayroll's employee.</p>							|
| branch			| 			|  <p>Swisspayroll's branch.</p>							|
| payroll			| 			|  <p>Swisspayroll's payroll.</p>							|

## Delete swisspayroll



	DELETE /swisspayrolls/:id


## Retrieve swisspayroll



	GET /swisspayrolls/:id


## Retrieve swisspayrolls



	GET /swisspayrolls


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update swisspayroll



	PUT /swisspayrolls/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| company			| 			|  <p>Swisspayroll's company.</p>							|
| employee			| 			|  <p>Swisspayroll's employee.</p>							|
| branch			| 			|  <p>Swisspayroll's branch.</p>							|
| payroll			| 			|  <p>Swisspayroll's payroll.</p>							|

# Swizzdeductions

## Create swizzdeductions



	POST /swizzdeductions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Swizzdeductions's name.</p>							|
| empCont			| 			|  <p>Swizzdeductions's empCont.</p>							|
| employerCont			| 			|  <p>Swizzdeductions's employerCont.</p>							|

## Delete swizzdeductions



	DELETE /swizzdeductions/:id


## Retrieve swizzdeductions



	GET /swizzdeductions/:id


## Update swizzdeductions



	PUT /swizzdeductions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Swizzdeductions's name.</p>							|
| empCont			| 			|  <p>Swizzdeductions's empCont.</p>							|
| employerCont			| 			|  <p>Swizzdeductions's employerCont.</p>							|

# Taxbenifit

## Create taxbenifit



	POST /taxbenifits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Taxbenifit's name.</p>							|
| country			| 			|  <p>Taxbenifit's country.</p>							|
| company			| 			|  <p>Taxbenifit's company.</p>							|
| region			| 			|  <p>Taxbenifit's region.</p>							|

## Delete taxbenifit



	DELETE /taxbenifits/:id


## Retrieve taxbenifit



	GET /taxbenifits/:id


## Retrieve taxbenifits



	GET /taxbenifits


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update taxbenifit



	PUT /taxbenifits/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Taxbenifit's name.</p>							|
| country			| 			|  <p>Taxbenifit's country.</p>							|
| company			| 			|  <p>Taxbenifit's company.</p>							|
| region			| 			|  <p>Taxbenifit's region.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's picture.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

# _Users_Prajith_Office_Projects_SPMAPI_src_api_orgchart_index_js

## Create orgchart



	POST /orgchart


# actualspent

## Delete actualspent



	DELETE /actualspent/:id


## Retrieve actualspent



	GET /actualspent


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# employee

## Create employee



	POST /employee


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| countryName			| 			|  <p>employee's countryName.</p>							|
| divisionName			| 			|  <p>employee's divisionName.</p>							|
| rating			| 			|  <p>employee's rating.</p>							|

## Delete employee



	DELETE /employee/:id


## Retrieve employee



	GET /employee


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Create employee



	PUT /employee


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| countryName			| 			|  <p>employee's countryName.</p>							|
| divisionName			| 			|  <p>employee's divisionName.</p>							|
| rating			| 			|  <p>employee's rating.</p>							|

# nominationPlan

## Create nominationPlan



	POST /nominationPlan


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| employeeid			| 			|  <p>employeeid's.</p>							|
| nominationPlan			| 			|  <p>nominationPlan's status.</p>							|


