//
//  MovieURL.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import Foundation

enum MovieURL: String {
    case nowPlaying = "now_playing"
    case upcoming = "upcoming"
    case popular = "popular"
    case topRated = "top_rated"
    
    public var urlString: String {
        "\(MovieDownloadManager.baseURL)\(self.rawValue)?api_key=\(TMDB_API.key)&language=en-US"
    }
}
