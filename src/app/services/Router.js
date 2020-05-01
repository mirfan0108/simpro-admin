const ENV = process.env.BASE_API

export default {
    Login: `${ENV}/admin`,
    UploadUrl: `${ENV}/image/avatar`,

    Super_TotalStatus: `${ENV}/super/counter/status`,
    Super_ListMks: `${ENV}/super/mks/list`,
    Super_AllAdmin: `${ENV}/super/administrator/all`,
    Super_CreateMKS: `${ENV}/super/mks/create`,
    Super_ModifyMks: `${ENV}/super/mks/modify`,
    Super_GetOneMks: `${ENV}/super/mks/info`
}