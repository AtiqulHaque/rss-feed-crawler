const Response = require('../../utilities/response');
const logger = require('../../utilities/logger');
const CampaignService = require('../../services/CampaignService');
const dotenv = require('dotenv');
dotenv.config();
/**
 *
 *  Upload file method
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

async function addCampaign(req, res, next) {
    try {
        let campaignService = new CampaignService();
        let params = { ...req.body };
        let { status, data } = await campaignService.addCampaigns(params);

        if (status === 'success') {
            res.json(Response.success(data));
        } else {
            res.json(Response.errorWithMessage(data), 500);
        }
    } catch (error) {
        console.log(error);
        logger.log('error', error);
        next(error);
    }
}

async function updateCampaign(req, res, next) {
    try {
        let campaignService = new CampaignService();
        const { campaignId } = { ...req.params };
        let { status, data } = await campaignService.campaignStatusUpdate(campaignId, 'active');

        if (status === 'success') {
            res.json(Response.success(data));
        } else {
            res.json(Response.errorWithMessage(data), 500);
        }
    } catch (error) {
        console.log(error);
        logger.log('error', error);
        next(error);
    }
}

module.exports = {
    addCampaign,
    updateCampaign,
};
