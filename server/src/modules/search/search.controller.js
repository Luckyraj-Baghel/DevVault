import { universalSearch } from "./search.service.js";

export const search = async (req, res) => {
  try {
    const results = await universalSearch(
      req.user.id,
      req.query.query
    );

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};