//
//  Dashboard.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI
import Alamofire

struct Dashboard: View {
    @State var user: User
    
    init(user: User) {
        self.user = user
    }
    
    var body: some View {
            ZStack {
                Color.red.opacity(0.2).ignoresSafeArea()
                VStack{
                    NavigationLink(destination: TrendingMovies().navigationTitle("What's Good")) {
                        Text("Popular Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                    NavigationLink(destination: DiscoverMovies().navigationTitle("Discover")) {
                        Text("Discover Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                }
            }.navigationTitle("Home: \(user.username)")
            .edgesIgnoringSafeArea(.all)
//                .onAppear {
//                    APIManager().getUser { result in
//                        if result != nil {
//                            user = result!
//                        }
//                    }
//                }
        }
}

struct Dashboard_Previews: PreviewProvider {
    static var previews: some View {
        Dashboard(user: User(id: 5, username: "", email_address: ""))
    }
}
