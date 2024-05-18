const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CampaignRunningHistorySchema = new mongoose.Schema(
    {
        campaign_id: {
            type: String,
        },
        last_status: {
            type: String,
        },
        process_date: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
);

CampaignRunningHistorySchema.plugin(mongoosePaginate);

const CampaignRunningHistory = mongoose.model(
    'CampaignRunningHistory',
    CampaignRunningHistorySchema,
    'campaign_running_history'
);

module.exports = CampaignRunningHistory;
